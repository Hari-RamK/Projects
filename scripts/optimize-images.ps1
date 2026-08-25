# Generates web-optimized derivatives of the source artwork into src/assets/optimized.
# Run from the project root:  powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
Add-Type -AssemblyName System.Drawing

$assets = Join-Path $PSScriptRoot "..\src\assets"
$out    = Join-Path $assets "optimized"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }

function Get-JpegEncoder {
    [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq "image/jpeg" }
}

# Returns the bounding box of pixels whose alpha is above the threshold.
function Get-AlphaBounds($bmp, $threshold = 8) {
    $minX = $bmp.Width; $minY = $bmp.Height; $maxX = -1; $maxY = -1
    $rect = New-Object System.Drawing.Rectangle 0, 0, $bmp.Width, $bmp.Height
    $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
                          [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $stride = $data.Stride
    $bytes = New-Object byte[] ($stride * $bmp.Height)
    [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
    $bmp.UnlockBits($data)

    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $row = $y * $stride
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            if ($bytes[$row + $x * 4 + 3] -gt $threshold) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    if ($maxX -lt 0) { return $null }
    New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
}

function Resize-Image($source, $target, $maxEdge, $quality, $trimAlpha = $false) {
    $img = New-Object System.Drawing.Bitmap $source
    $srcRect = New-Object System.Drawing.Rectangle 0, 0, $img.Width, $img.Height

    if ($trimAlpha) {
        $bounds = Get-AlphaBounds $img
        if ($bounds) { $srcRect = $bounds }
    }

    $scale = [Math]::Min(1.0, $maxEdge / [Math]::Max($srcRect.Width, $srcRect.Height))
    $w = [int][Math]::Round($srcRect.Width * $scale)
    $h = [int][Math]::Round($srcRect.Height * $scale)

    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $g.DrawImage($img, $destRect, $srcRect.X, $srcRect.Y, $srcRect.Width, $srcRect.Height,
                 [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    if ([IO.Path]::GetExtension($target) -eq ".png") {
        $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        # JPEG has no alpha - flatten onto white first.
        $flat = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $fg = [System.Drawing.Graphics]::FromImage($flat)
        $fg.Clear([System.Drawing.Color]::White)
        $fg.DrawImage($bmp, 0, 0, $w, $h)
        $fg.Dispose()

        $params = New-Object System.Drawing.Imaging.EncoderParameters 1
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [int64]$quality)
        $flat.Save($target, (Get-JpegEncoder), $params)
        $flat.Dispose()
    }

    $bmp.Dispose(); $img.Dispose()

    # Re-encoding an already-compressed JPEG can grow it. If we neither shrank the
    # pixels nor the bytes, keep the untouched original instead.
    $note = ""
    if ((Get-Item $target).Length -ge (Get-Item $source).Length -and $scale -eq 1.0) {
        Copy-Item $source $target -Force
        $note = "  (kept original)"
    }

    $before = [math]::Round((Get-Item $source).Length / 1KB)
    $after  = [math]::Round((Get-Item $target).Length / 1KB)
    "{0,-24} -> {1,-26} {2}x{3}  {4} KB -> {5} KB{6}" -f `
        [IO.Path]::GetFileName($source), [IO.Path]::GetFileName($target), $w, $h, $before, $after, $note
}

# --- Logo: trim the transparent padding, then size for its largest use (footer) --
Resize-Image "$assets\logo.png" "$out\logo.png" 320 100 $true

# --- Hero / about photos: portrait, shown in a card no wider than ~560 CSS px ----
foreach ($n in @("download", "download1", "download2")) {
    Resize-Image "$assets\$n.jpg" "$out\$n.jpg" 1120 82
}

# --- Category icons: rendered as circles, max ~180 CSS px --------------------
foreach ($n in @("sweet", "savouries", "bakery", "others")) {
    Resize-Image "$assets\$n.jpg" "$out\$n.jpg" 400 82
}

# --- Menu boards: shown at up to ~640 CSS px wide ---------------------------
foreach ($n in @("sweet-menu", "savouries-menu", "bakery-menu", "others-menu")) {
    Resize-Image "$assets\$n.jpg" "$out\$n.jpg" 1000 82
}

# --- Product posters: shown in a card up to ~520 CSS px wide ----------------
foreach ($n in @("board light 1", "board light 2", "board light 3", "board light 5")) {
    $slug = ($n -replace " ", "-")
    Resize-Image "$assets\$n.jpg" "$out\$slug.jpg" 1040 80
}

"`nDone. Optimized files are in src/assets/optimized/"
