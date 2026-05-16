$targetDir = "c:\My Web Sites\Ellegant Era Salon and Acadmy\makeupstudiobysuu.com"
$files = Get-ChildItem -Path $targetDir -Include *.html, *.php, *.xml, *.json -Recurse -File

$count = 0
foreach ($file in $files) {
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 1. Replace "Makeup Studio by Suu" (and variations like "By Suu") safely.
    # The -ireplace operator is case-insensitive.
    $content = $content -ireplace "Makeup Studio by Suu", "Ellegant Era Salon & Academy"
    
    # 2. Replace standalone "Suu" with word boundaries to prevent replacing "suu" in URLs (like makeupstudiobysuu.com)
    # \b ensures it only matches "Suu" as a whole word.
    $content = $content -ireplace "\bSuu\b", "Ellegant Era Salon & Academy"
    
    # Only write back if changes were made
    if ($content -cne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.FullName)"
        $count++
    }
}

Write-Host "========================================="
Write-Host "Replacement complete! Updated $count files."
Write-Host "========================================="
