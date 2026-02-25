import nbformat
from nbconvert import HTMLExporter
from nbconvert.preprocessors import ExecutePreprocessor

# Load notebook
with open('airbnb_analysis.ipynb', 'r', encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

# Execute notebook
ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
print("Executing notebook (this may take a minute)...")
ep.preprocess(nb, {'metadata': {'path': '.'}})

# Export to HTML
html_exporter = HTMLExporter(template_name='classic')
(body, resources) = html_exporter.from_notebook_node(nb)

with open('airbnb_analysis.html', 'w', encoding='utf-8') as f:
    f.write(body)

print("HTML generated successfully with executed charts.")
