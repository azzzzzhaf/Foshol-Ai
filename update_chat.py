import re
import os

files_to_update = ['about.html', 'market.html', 'medicine.html', 'services.html', 'store.html', 'weather.html']

# Read the latest chat widget and JS from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract Chat HTML
chat_html_match = re.search(r'(<div id="chat-widget".*?<!-- Visual Resize Handle -->\s*<div.*?</div>\s*</div>\s*</div>)', index_content, re.DOTALL)
if not chat_html_match:
    print("Could not extract chat HTML from index.html")
    exit(1)
chat_html = chat_html_match.group(1)

# Extract Chat JS
chat_js_match = re.search(r'(// --- AI Chat Logic ---.*?)// --- AI Leaf Scanner Simulator Logic ---', index_content, re.DOTALL)
if not chat_js_match:
    print("Could not extract chat JS from index.html")
    exit(1)
chat_js = chat_js_match.group(1)

for file in files_to_update:
    if not os.path.exists(file):
        print(f"{file} does not exist. Skipping.")
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace HTML (finding the <div id="chat-widget">...</div>)
    # The old HTML might vary, but it ends with </div> just before <script> or <footer>
    content = re.sub(r'<div id="chat-widget".*?(?=<script>|<!--|</footer>)', chat_html + '\n\n    ', content, flags=re.DOTALL)
    
    # Replace JS
    # We look for // --- AI Chat Logic --- or toggleChat function up to the next section or </script>
    if '// --- AI Chat Logic ---' in content:
        content = re.sub(r'// --- AI Chat Logic ---.*?(?=// --- |</script>)', chat_js, content, flags=re.DOTALL)
    else:
        # Fallback if old code doesn't have the exact comment
        content = re.sub(r'function toggleChat\(\).*?(?=</script>|// ---)', chat_js, content, flags=re.DOTALL)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file}")

