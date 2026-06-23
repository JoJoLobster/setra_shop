<#
.SYNOPSIS
    Cache busting tool: appends ?v=<version> to all local CSS/JS references in HTML files.

.DESCRIPTION
    Scans all .html files under -Root and rewrites local asset references like
        href="assets/css/style.css"
        src="assets/js/main.js"
    into
        href="assets/css/style.css?v=20260622103045"
        src="assets/js/main.js?v=20260622103045"
    Any existing ?v=xxx is overwritten with the new version.
    External URLs (http://, https://, //) are NOT touched.

.PARAMETER Root
    Site root directory. Defaults to the parent of this script's directory.

.PARAMETER Version
    Version string to write. Defaults to current timestamp (yyyyMMddHHmmss).
    Example with git short hash:
        .\cache-bust.ps1 -Version (git rev-parse --short HEAD)

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1 -Version "1.2.3"
#>

[CmdletBinding()]
param(
    [string]$Root,
    [string]$Version = (Get-Date -Format "yyyyMMddHHmmss")
)

if (-not $Root) {
    $Root = Split-Path -Parent $PSScriptRoot
    if (-not $Root) { $Root = (Get-Location).Path }
}
$Root = (Resolve-Path $Root).Path

Write-Host "[cache-bust] root    = $Root"
Write-Host "[cache-bust] version = $Version"
Write-Host ""

$htmlFiles = Get-ChildItem -Path $Root -Filter *.html -Recurse -File |
             Where-Object {
                 $_.FullName -notmatch '\\node_modules\\' -and
                 $_.FullName -notmatch '\\\.git\\'
             }

if (-not $htmlFiles -or $htmlFiles.Count -eq 0) {
    Write-Warning "[cache-bust] No HTML files found under $Root."
    exit 0
}

# Matches (href|src)="assets/.../*.css|js[?...]" with double quotes.
$pattern = '(?<attr>(?:href|src)\s*=\s*")(?<url>assets/[^"?#]+?\.(?:css|js|jpg|png|svg|woff2))(?:\?[^"#]*)?'
$replacement = '${attr}${url}?v=' + $Version

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$updatedCount = 0
$totalRefs = 0

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, $utf8NoBom)
    $regexMatches = [regex]::Matches($content, $pattern)

    if ($regexMatches.Count -eq 0) {
        Write-Host ("[skip]      {0}  (no local CSS/JS refs)" -f $file.Name)
        continue
    }

    $newContent = [regex]::Replace($content, $pattern, $replacement)

    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, $utf8NoBom)
        Write-Host ("[updated]   {0}  ({1} refs)" -f $file.Name, $regexMatches.Count)
        $updatedCount++
        $totalRefs += $regexMatches.Count
    } else {
        Write-Host ("[unchanged] {0}" -f $file.Name)
    }
}

Write-Host ""
Write-Host ("[cache-bust] Done. Updated {0} HTML file(s), {1} reference(s) in total." -f $updatedCount, $totalRefs)
Write-Host ("[cache-bust] Version: {0}" -f $Version)
