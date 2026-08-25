# Builds a single self-contained HTML preview of the site.
#
# The React app needs Node to run. This script produces a static page that uses
# the exact same stylesheets and markup, with every image embedded as a data
# URI, so the layout can be opened and checked on any device without a build.
#
#   powershell -ExecutionPolicy Bypass -File scripts/build-preview.ps1

$ErrorActionPreference = "Stop"

$root     = Join-Path $PSScriptRoot ".."
$template = Join-Path $root "preview\template.html"
$target   = Join-Path $root "preview\city-bakery-preview.html"
$images   = Join-Path $root "src\assets\optimized"

$html = Get-Content $template -Raw -Encoding UTF8

# --- Inline the real stylesheets --------------------------------------------
foreach ($pair in @(
    @{ token = "{{CSS_INDEX}}"; file = "src\index.css" },
    @{ token = "{{CSS_APP}}";   file = "src\App.css" }
)) {
    $css = Get-Content (Join-Path $root $pair.file) -Raw -Encoding UTF8
    $html = $html.Replace($pair.token, $css)
}

# --- Inline shared icons -----------------------------------------------------
$phoneIcon = @'
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M6.6 2.5 9 7l-2 1.6a13 13 0 0 0 6.4 6.4L15 13l4.5 2.4a1.6 1.6 0 0 1 .8 1.7l-.4 2A2 2 0 0 1 17.8 21C9.6 20.4 3.6 14.4 3 6.2A2 2 0 0 1 4.9 4l2-.4a1.6 1.6 0 0 1 1.7.9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
'@.Trim()
$html = $html.Replace("{{PHONE_ICON}}", $phoneIcon)

$whatsappPath = 'M6.5 17.4 4 21l3.7-1.5A8.5 8.5 0 1 0 4.4 15Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 9.3c0-.7.5-1.3 1.1-1.3.3 0 .5.1.7.4l.7 1.2c.2.3.2.7 0 1l-.5.7c.4.9 1.2 1.7 2.1 2.1l.7-.5c.3-.2.7-.2 1 0l1.2.7c.3.2.4.4.4.7 0 .6-.6 1.1-1.3 1.1-3.1 0-6.1-3-6.1-6.1Z" fill="currentColor'
$whatsappIconSm = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="' + $whatsappPath + '"/></svg>'
$whatsappIconLg = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true"><path d="' + $whatsappPath + '"/></svg>'
$html = $html.Replace("{{WHATSAPP_ICON}}", $whatsappIconSm)
$html = $html.Replace("{{WHATSAPP_ICON_LG}}", $whatsappIconLg)

# --- Embed every referenced image as a data URI ------------------------------
$cache = @{}
$total = 0

$matches = [regex]::Matches($html, '\{\{IMG:([^}]+)\}\}')
foreach ($m in $matches) {
    $name = $m.Groups[1].Value
    if ($cache.ContainsKey($name)) { continue }

    $path = Join-Path $images $name
    if (-not (Test-Path $path)) { throw "Missing image: $path" }

    $mime = switch ([IO.Path]::GetExtension($name).ToLower()) {
        ".png"  { "image/png" }
        ".jpg"  { "image/jpeg" }
        ".jpeg" { "image/jpeg" }
        default { throw "Unsupported image type: $name" }
    }

    $bytes = [IO.File]::ReadAllBytes($path)
    $total += $bytes.Length
    $cache[$name] = "data:$mime;base64," + [Convert]::ToBase64String($bytes)
    "  embedded {0,-22} {1,6:N0} KB" -f $name, ($bytes.Length / 1KB)
}

foreach ($name in $cache.Keys) {
    $html = $html.Replace("{{IMG:$name}}", $cache[$name])
}

# --- Fail loudly rather than shipping a page with holes in it ----------------
$leftover = [regex]::Matches($html, '\{\{[A-Z_]+[^}]*\}\}')
if ($leftover.Count -gt 0) {
    throw "Unresolved placeholders: " + (($leftover | ForEach-Object { $_.Value }) -join ", ")
}

[IO.File]::WriteAllText($target, $html, (New-Object Text.UTF8Encoding $false))

"`nimages embedded : {0:N2} MB" -f ($total / 1MB)
"page written    : {0}  ({1:N2} MB)" -f $target, ((Get-Item $target).Length / 1MB)
