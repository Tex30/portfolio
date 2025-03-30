// Optimized Project Page Report Generator
// Features:
// - Generates PDF with text AND images
// - Better memory management
// - Improved styling and layout
// - Progress indicator
// - Better error handling
// - Proper handling of nested bullet points and special characters

document.addEventListener('DOMContentLoaded', function() {
    // First, add the required libraries if not already present
    if (typeof window.jspdf === 'undefined') {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
            .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'))
            .catch(error => console.error('Error loading libraries:', error));
    }
    
    // Add "Download Report" dropdown button to project buttons section
    const projectButtons = document.querySelector('.project-buttons');
    
    if (projectButtons) {
        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'report-dropdown';
        dropdown.style.position = 'relative';
        dropdown.style.display = 'inline-block';
        
        // Create main button
        const mainButton = document.createElement('a');
        mainButton.href = '#';
        mainButton.className = 'btn btn-secondary';
        mainButton.innerHTML = '<i class="fas fa-file-download"></i> Download Report <i class="fas fa-caret-down" style="margin-left: 5px;"></i>';
        
        // Create dropdown content
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'report-dropdown-content';
        dropdownContent.style.display = 'none';
        dropdownContent.style.position = 'absolute';
        dropdownContent.style.backgroundColor = '#f9f9f9';
        dropdownContent.style.minWidth = '160px';
        dropdownContent.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
        dropdownContent.style.zIndex = '1';
        dropdownContent.style.borderRadius = '4px';
        dropdownContent.style.top = '100%';
        dropdownContent.style.left = '0';
        dropdownContent.style.marginTop = '3px';
        
        // PDF with images option
        const pdfWithImagesOption = document.createElement('a');
        pdfWithImagesOption.href = '#';
        pdfWithImagesOption.innerHTML = '<i class="fas fa-file-pdf"></i> PDF with Images';
        pdfWithImagesOption.style.padding = '12px 16px';
        pdfWithImagesOption.style.textDecoration = 'none';
        pdfWithImagesOption.style.display = 'block';
        pdfWithImagesOption.style.color = '#333';
        pdfWithImagesOption.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
            this.style.color = 'white';
        });
        pdfWithImagesOption.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
            this.style.color = '#333';
        });
        pdfWithImagesOption.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDFWithImages();
            dropdownContent.style.display = 'none';
        });
        
        // Text-only PDF option (faster)
        const pdfTextOption = document.createElement('a');
        pdfTextOption.href = '#';
        pdfTextOption.innerHTML = '<i class="fas fa-file-alt"></i> PDF Text Only (Fast)';
        pdfTextOption.style.padding = '12px 16px';
        pdfTextOption.style.textDecoration = 'none';
        pdfTextOption.style.display = 'block';
        pdfTextOption.style.color = '#333';
        pdfTextOption.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
            this.style.color = 'white';
        });
        pdfTextOption.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
            this.style.color = '#333';
        });
        pdfTextOption.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDF();
            dropdownContent.style.display = 'none';
        });
        
        // Markdown option
        const markdownOption = document.createElement('a');
        markdownOption.href = '#';
        markdownOption.innerHTML = '<i class="fas fa-markdown"></i> Markdown Format';
        markdownOption.style.padding = '12px 16px';
        markdownOption.style.textDecoration = 'none';
        markdownOption.style.display = 'block';
        markdownOption.style.color = '#333';
        markdownOption.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
            this.style.color = 'white';
        });
        markdownOption.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
            this.style.color = '#333';
        });
        markdownOption.addEventListener('click', function(e) {
            e.preventDefault();
            generateMarkdownReport();
            dropdownContent.style.display = 'none';
        });
        
        // Append options to dropdown content
        dropdownContent.appendChild(pdfWithImagesOption);
        dropdownContent.appendChild(pdfTextOption);
        dropdownContent.appendChild(markdownOption);
        
        // Append elements to their containers
        dropdown.appendChild(mainButton);
        dropdown.appendChild(dropdownContent);
        projectButtons.appendChild(dropdown);
        
        // Toggle dropdown on button click
        mainButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (dropdownContent.style.display === 'none') {
                dropdownContent.style.display = 'block';
            } else {
                dropdownContent.style.display = 'none';
            }
        });
        
        // Close the dropdown if clicked outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    }
    
    // Also add to sidebar
    const sidebarLinks = document.querySelector('.sidebar-links');
    
    if (sidebarLinks) {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-file-download"></i>
            <a href="#" class="generate-report">Download Report</a>
        `;
        
        const sidebarLink = li.querySelector('.generate-report');
        
        // Create a custom dropdown for the sidebar link
        sidebarLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if dropdown already exists
            let dropdown = document.querySelector('.sidebar-report-dropdown');
            if (dropdown) {
                dropdown.remove();
                return;
            }
            
            // Create dropdown
            dropdown = document.createElement('div');
            dropdown.className = 'sidebar-report-dropdown';
            dropdown.style.position = 'absolute';
            dropdown.style.backgroundColor = '#f9f9f9';
            dropdown.style.minWidth = '160px';
            dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
            dropdown.style.zIndex = '1';
            dropdown.style.borderRadius = '4px';
            dropdown.style.left = '100%';
            dropdown.style.top = '0';
            dropdown.style.marginLeft = '10px';
            
            // PDF with images option
            const pdfWithImagesOption = document.createElement('a');
            pdfWithImagesOption.href = '#';
            pdfWithImagesOption.innerHTML = '<i class="fas fa-file-pdf"></i> PDF with Images';
            pdfWithImagesOption.style.padding = '12px 16px';
            pdfWithImagesOption.style.textDecoration = 'none';
            pdfWithImagesOption.style.display = 'block';
            pdfWithImagesOption.style.color = '#333';
            pdfWithImagesOption.addEventListener('mouseover', function() {
                this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
                this.style.color = 'white';
            });
            pdfWithImagesOption.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
                this.style.color = '#333';
            });
            pdfWithImagesOption.addEventListener('click', function(e) {
                e.preventDefault();
                generatePDFWithImages();
                dropdown.remove();
            });
            
            // Text-only PDF option
            const pdfTextOption = document.createElement('a');
            pdfTextOption.href = '#';
            pdfTextOption.innerHTML = '<i class="fas fa-file-alt"></i> PDF Text Only';
            pdfTextOption.style.padding = '12px 16px';
            pdfTextOption.style.textDecoration = 'none';
            pdfTextOption.style.display = 'block';
            pdfTextOption.style.color = '#333';
            pdfTextOption.addEventListener('mouseover', function() {
                this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
                this.style.color = 'white';
            });
            pdfTextOption.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
                this.style.color = '#333';
            });
            pdfTextOption.addEventListener('click', function(e) {
                e.preventDefault();
                generatePDF();
                dropdown.remove();
            });
            
            // Markdown option
            const markdownOption = document.createElement('a');
            markdownOption.href = '#';
            markdownOption.innerHTML = '<i class="fas fa-markdown"></i> Markdown Format';
            markdownOption.style.padding = '12px 16px';
            markdownOption.style.textDecoration = 'none';
            markdownOption.style.display = 'block';
            markdownOption.style.color = '#333';
            markdownOption.addEventListener('mouseover', function() {
                this.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
                this.style.color = 'white';
            });
            markdownOption.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
                this.style.color = '#333';
            });
            markdownOption.addEventListener('click', function(e) {
                e.preventDefault();
                generateMarkdownReport();
                dropdown.remove();
            });
            
            // Append options to dropdown
            dropdown.appendChild(pdfWithImagesOption);
            dropdown.appendChild(pdfTextOption);
            dropdown.appendChild(markdownOption);
            
            // Position and append the dropdown
            li.style.position = 'relative';
            li.appendChild(dropdown);
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(event) {
                if (!dropdown.contains(event.target) && event.target !== sidebarLink) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
        
        sidebarLinks.appendChild(li);
    }
});

// Helper function to load scripts dynamically
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Generate markdown report with improved nested list handling
function generateMarkdownReport() {
    // Get the page content
    const projectTitle = document.querySelector('.project-hero-content h1').textContent;
    const projectDescription = document.querySelector('.project-hero-content p').textContent;
    const projectDate = document.querySelector('.project-date span').textContent;
    const projectCategory = document.querySelector('.project-category span').textContent;
    
    // Get all sections content
    const sections = document.querySelectorAll('.project-section');
    let sectionsContent = '';
    
    // Process images for markdown (just description and URLs)
    const allImages = document.querySelectorAll('.project-image-container img, .project-section img');
    let imageSection = '';
    
    if (allImages.length > 0) {
        imageSection = '\n\n## Images Referenced\n\n';
        allImages.forEach((img, index) => {
            const caption = img.nextElementSibling && img.nextElementSibling.classList.contains('image-caption') 
                ? img.nextElementSibling.textContent 
                : `Figure ${index + 1}`;
            const imgUrl = new URL(img.src, window.location.href).href;
            imageSection += `![${caption}](${imgUrl})\n\n*${caption}*\n\n`;
        });
    }

    // Improved markdown list generation with proper nesting
    const processListItem = (item, level = 0) => {
        let markdown = '';
        const indent = '  '.repeat(level); // Two spaces per level for markdown indentation
        
        // Get the bullet or number prefix based on list type
        const listType = item.closest('ol') ? 'ol' : 'ul';
        let prefix = '';
        
        if (listType === 'ol') {
            // We'd need to determine the actual number, but this is complex in markdown
            // For simplicity, we'll use "1." for all items in an ordered list
            prefix = '1.';
        } else {
            prefix = '-';
        }
        
        // Get the direct text content (excluding nested list content)
        let itemText = '';
        for (const node of item.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                itemText += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE && 
                      !['UL', 'OL'].includes(node.tagName)) {
                itemText += node.textContent;
            }
        }
        itemText = itemText.replace(/\n/g, ' ').trim();
        
        // Add this item with proper indentation
        markdown += `${indent}${prefix} ${itemText}\n`;
        
        // Process any nested lists
        const nestedLists = item.querySelectorAll(':scope > ul, :scope > ol');
        for (const nestedList of nestedLists) {
            const nestedItems = nestedList.querySelectorAll(':scope > li');
            for (const nestedItem of nestedItems) {
                markdown += processListItem(nestedItem, level + 1);
            }
        }
        
        return markdown;
    };
    
    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2').textContent;
        sectionsContent += `\n\n## ${sectionTitle}\n\n`;
        
        // Get all paragraphs, lists, and subheadings in this section
        const elements = section.querySelectorAll('p, ul, ol, h3');
        elements.forEach(el => {
            if (el.tagName === 'H3') {
                sectionsContent += `\n### ${el.textContent}\n\n`;
            } else if (el.tagName === 'P') {
                sectionsContent += `${el.textContent}\n\n`;
            } else if (el.tagName === 'UL' || el.tagName === 'OL') {
                // Only process top-level list items
                const items = el.querySelectorAll(':scope > li');
                items.forEach(item => {
                    sectionsContent += processListItem(item);
                });
                sectionsContent += '\n';
            }
        });
    });
    
    // Generate the markdown report
    const reportContent = `# ${projectTitle}
${projectDescription}

**${projectDate}**
**Categories:** ${projectCategory}

${sectionsContent}

${imageSection}

---
Generated from Michael Teixeira's Portfolio | [tex30.github.io/portfolio](https://tex30.github.io/portfolio/)
`;

    // Create a blob and download link
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '-').toLowerCase()}-report.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Generate text-only PDF with improved nested list handling
function generatePDF() {
    showProgressIndicator('Generating PDF report...');
    
    // Ensure the jsPDF library is loaded
    if (typeof window.jspdf === 'undefined') {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
            .then(() => {
                setTimeout(() => generatePDF(), 500);
            })
            .catch(error => {
                console.error('Error loading jsPDF:', error);
                hideProgressIndicator();
                alert('Could not load PDF generation library. Please try again.');
            });
        return;
    }
    
    const { jsPDF } = window.jspdf;
    
    // Get the project content
    const projectContent = document.querySelector('.project-content');
    const projectTitle = document.querySelector('.project-hero-content h1').textContent;
    
    try {
        // Create PDF with proper font support
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add a Unicode font to support special characters
        pdf.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
        pdf.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Bold.ttf', 'Roboto', 'bold');
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15; // margin in mm
        
        // Add title
        pdf.setFont("Roboto", "bold");
        pdf.setFontSize(24);
        pdf.setTextColor(74, 111, 255); // Primary color
        pdf.text(projectTitle, margin, margin + 10);
        
        // Add description
        const projectDescription = document.querySelector('.project-hero-content p').textContent;
        pdf.setFont("Roboto", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(51, 51, 51); // Text color
        const descriptionLines = pdf.splitTextToSize(projectDescription, pageWidth - 2 * margin);
        pdf.text(descriptionLines, margin, margin + 20);
        
        // Add metadata
        const projectDate = document.querySelector('.project-date span').textContent;
        const projectCategory = document.querySelector('.project-category span').textContent;
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100); // Gray
        pdf.text(`${projectDate} | ${projectCategory}`, margin, margin + 30);
        
        // Initialize y position for content
        let yPos = margin + 40;
        
        // Define bullet point symbols for different levels
        const bulletSymbols = ["•", "○", "▪", "▫"];
        
        // Process each section
        const sections = projectContent.querySelectorAll('.project-section');
        updateProgress('Processing content...', 0.2);
        
        // Function to recursively process lists with proper bullet points
        const processListItem = (item, level, listType, index, startY) => {
            let y = startY;
            const indentPerLevel = 5; // mm per level
            const indent = margin + (level * indentPerLevel);
            
            // Check if we need a new page
            if (y > pageHeight - margin - 10) {
                pdf.addPage();
                y = margin + 10;
            }
            
            // Generate appropriate bullet/number
            let bullet;
            if (listType === 'OL') {
                bullet = `${index + 1}.`;
            } else {
                // Use different bullet styles based on nesting level
                bullet = bulletSymbols[level % bulletSymbols.length];
            }
            
            // Get direct text content without including nested list text
            let itemText = '';
            for (const node of item.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    itemText += node.textContent;
                } else if (node.nodeType === Node.ELEMENT_NODE && 
                          !['UL', 'OL'].includes(node.tagName)) {
                    itemText += node.textContent;
                }
            }
            itemText = itemText.replace(/\n/g, ' ').trim();
            
            // Render the list item text
            const textWidth = pageWidth - 2 * margin - indent - 5;
            const itemLines = pdf.splitTextToSize(`${bullet} ${itemText}`, textWidth);
            
            pdf.text(itemLines, indent, y);
            y += itemLines.length * 6;
            
            // Process any nested lists
            const nestedLists = item.querySelectorAll(':scope > ul, :scope > ol');
            
            for (const nestedList of nestedLists) {
                const nestedItems = nestedList.querySelectorAll(':scope > li');
                
                for (let i = 0; i < nestedItems.length; i++) {
                    y = processListItem(nestedItems[i], level + 1, nestedList.tagName, i, y);
                }
            }
            
            return y + 2; // Return the new position with some spacing
        };
        
        // Function to add section content
        const addSectionContent = (section, startY) => {
            let y = startY;
            
            // Add section title
            const sectionTitle = section.querySelector('h2').textContent;
            pdf.setFont("Roboto", "bold");
            pdf.setFontSize(18);
            pdf.setTextColor(22, 33, 62); // Secondary color
            pdf.text(sectionTitle, margin, y);
            y += 10;
            
            // Process all elements in the section
            const elements = section.children;
            
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                
                // Skip the section title (h2) since we already processed it
                if (el.tagName === 'H2') continue;
                
                // Check if we need a new page
                if (y > pageHeight - margin - 10) {
                    pdf.addPage();
                    y = margin + 10;
                }
                
                if (el.tagName === 'H3') {
                    pdf.setFont("Roboto", "bold");
                    pdf.setFontSize(14);
                    pdf.setTextColor(74, 111, 255); // Primary color
                    pdf.text(el.textContent, margin, y);
                    y += 8;
                } 
                else if (el.tagName === 'P') {
                    pdf.setFont("Roboto", "normal");
                    pdf.setFontSize(11);
                    pdf.setTextColor(51, 51, 51); // Text color
                    const lines = pdf.splitTextToSize(el.textContent, pageWidth - 2 * margin);
                    pdf.text(lines, margin, y);
                    y += lines.length * 6 + 4;
                } 
                else if (el.tagName === 'UL' || el.tagName === 'OL') {
                    pdf.setFont("Roboto", "normal");
                    pdf.setFontSize(11);
                    pdf.setTextColor(51, 51, 51); // Text color
                    
                    // Get only top-level list items
                    const items = el.querySelectorAll(':scope > li');
                    
                    for (let j = 0; j < items.length; j++) {
                        // Process each list item recursively
                        y = processListItem(items[j], 0, el.tagName, j, y);
                    }
                }
            }
            
            return y + 10; // Return the new y position with some padding
        };
        
        // Process each section
        sections.forEach((section, index) => {
            updateProgress(`Processing section ${index + 1} of ${sections.length}...`, 0.2 + (0.6 * (index / sections.length)));
            
            // Check if we need a new page
            if (yPos > pageHeight - margin - 10) {
                pdf.addPage();
                yPos = margin + 10;
            }
            
            yPos = addSectionContent(section, yPos);
        });
        
        // Add footer with page numbers
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFont("Roboto", "normal"); // Use normal font for footer
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100); // Gray
            pdf.text(`Generated from Michael Teixeira's Portfolio - tex30.github.io/portfolio`, margin, pageHeight - 10);
            pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10, { align: 'right' });
        }
        
        updateProgress('Finalizing PDF...', 0.9);
        
        // Download the PDF
        pdf.save(`${projectTitle.replace(/\s+/g, '-').toLowerCase()}-report.pdf`);
        hideProgressIndicator();
    } catch (error) {
        console.error('Error generating PDF:', error);
        hideProgressIndicator();
        alert('An error occurred while generating the PDF. Please try again.');
    }
}

// Generate PDF with images and improved nested list handling
async function generatePDFWithImages() {
    showProgressIndicator('Preparing to generate PDF with images...');
    
    // Ensure required libraries are loaded
    if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
            generatePDFWithImages();
        } catch (error) {
            console.error('Error loading libraries:', error);
            hideProgressIndicator();
            alert('Could not load required libraries. Please try again.');
        }
        return;
    }
    
    const { jsPDF } = window.jspdf;
    
    try {
        // Get the project content
        const projectContent = document.querySelector('.project-content');
        const projectTitle = document.querySelector('.project-hero-content h1').textContent;
        
        // Create PDF with proper font support
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add a Unicode font to support special characters
        pdf.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
        pdf.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Bold.ttf', 'Roboto', 'bold');
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15; // margin in mm
        const contentWidth = pageWidth - (2 * margin);
        
        // Define bullet point symbols for different levels
        const bulletSymbols = ["•", "○", "▪", "▫"];
        
        // Add title
        pdf.setFont("Roboto", "bold");
        pdf.setFontSize(24);
        pdf.setTextColor(74, 111, 255); // Primary color
        pdf.text(projectTitle, margin, margin + 10);
        
        // Add description
        const projectDescription = document.querySelector('.project-hero-content p').textContent;
        pdf.setFont("Roboto", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(51, 51, 51); // Text color
        const descriptionLines = pdf.splitTextToSize(projectDescription, contentWidth);
        pdf.text(descriptionLines, margin, margin + 20);
        
        // Add metadata
        const projectDate = document.querySelector('.project-date span').textContent;
        const projectCategory = document.querySelector('.project-category span').textContent;
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100); // Gray
        pdf.text(`${projectDate} | ${projectCategory}`, margin, margin + 30);
        
        // Initialize y position for content
        let yPos = margin + 40;
        
        // Function to recursively process nested lists
        const processListItem = (item, level, listType, index, startY) => {
            let y = startY;
            const indentPerLevel = 5; // mm per level
            const indent = margin + (level * indentPerLevel);
            
            // Check if we need a new page
            if (y > pageHeight - margin - 10) {
                pdf.addPage();
                y = margin + 10;
            }
            
            // Generate appropriate bullet/number
            let bullet;
            if (listType === 'OL') {
                bullet = `${index + 1}.`;
            } else {
                // Use different bullet styles based on nesting level
                bullet = bulletSymbols[level % bulletSymbols.length];
            }
            
            // Get direct text content without including nested list text
            let itemText = '';
            for (const node of item.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    itemText += node.textContent;
                } else if (node.nodeType === Node.ELEMENT_NODE && 
                          !['UL', 'OL'].includes(node.tagName)) {
                    itemText += node.textContent;
                }
            }
            itemText = itemText.replace(/\n/g, ' ').trim();
            
            // Render the list item text
            const textWidth = pageWidth - 2 * margin - indent - 5;
            const itemLines = pdf.splitTextToSize(`${bullet} ${itemText}`, textWidth);
            
            pdf.text(itemLines, indent, y);
            y += itemLines.length * 6;
            
            // Process any nested lists
            const nestedLists = item.querySelectorAll(':scope > ul, :scope > ol');
            
            for (const nestedList of nestedLists) {
                const nestedItems = nestedList.querySelectorAll(':scope > li');
                
                for (let i = 0; i < nestedItems.length; i++) {
                    y = processListItem(nestedItems[i], level + 1, nestedList.tagName, i, y);
                }
            }
            
            return y + 2; // Return the new position with some spacing
        };
        
        // Process each section
        const sections = projectContent.querySelectorAll('.project-section');
        
        for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            const section = sections[sectionIndex];
            updateProgress(`Processing section ${sectionIndex + 1} of ${sections.length}...`, (sectionIndex / sections.length) * 0.8);
            
            // Check if we need a new page
            if (yPos > pageHeight - margin - 20) {
                pdf.addPage();
                yPos = margin + 10;
            }
            
            // Add section title
            const sectionTitle = section.querySelector('h2').textContent;
            pdf.setFont("Roboto", "bold");
            pdf.setFontSize(18);
            pdf.setTextColor(22, 33, 62); // Secondary color
            pdf.text(sectionTitle, margin, yPos);
            yPos += 10;
            
            // Process section content (text and images)
            const elements = Array.from(section.children);
            
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                
                // Skip the section title (h2) since we already processed it
                if (el.tagName === 'H2') continue;
                
                // Check if we need a new page
                if (yPos > pageHeight - margin - 20) {
                    pdf.addPage();
                    yPos = margin + 10;
                }
                
                // Handle different types of elements
                if (el.tagName === 'H3') {
                    pdf.setFont("Roboto", "bold");
                    pdf.setFontSize(14);
                    pdf.setTextColor(74, 111, 255); // Primary color
                    pdf.text(el.textContent, margin, yPos);
                    yPos += 8;
                } 
                else if (el.tagName === 'P') {
                    pdf.setFont("Roboto", "normal");
                    pdf.setFontSize(11);
                    pdf.setTextColor(51, 51, 51); // Text color
                    const lines = pdf.splitTextToSize(el.textContent, contentWidth);
                    pdf.text(lines, margin, yPos);
                    yPos += lines.length * 6 + 4;
                } 
                else if (el.tagName === 'UL' || el.tagName === 'OL') {
                    pdf.setFont("Roboto", "normal");
                    pdf.setFontSize(11);
                    pdf.setTextColor(51, 51, 51); // Text color
                    
                    // Get only top-level list items
                    const items = el.querySelectorAll(':scope > li');
                    
                    for (let j = 0; j < items.length; j++) {
                        // Process each list item recursively
                        yPos = processListItem(items[j], 0, el.tagName, j, yPos);
                    }
                }
                else if (el.classList.contains('project-image-grid') || el.classList.contains('project-image-container')) {
                    // Handle image containers and grids
                    const images = el.querySelectorAll('img');
                    
                    for (let j = 0; j < images.length; j++) {
                        const img = images[j];
                        
                        try {
                            updateProgress(`Processing image ${j + 1} of ${images.length}...`, 0.5);
                            
                            // Add caption if available
                            let caption = '';
                            if (img.nextElementSibling && img.nextElementSibling.classList.contains('image-caption')) {
                                caption = img.nextElementSibling.textContent;
                            }
                            
                            // Create a temporary canvas to draw the image
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            
                            // Create a new image to ensure it's loaded
                            const imgObj = new Image();
                            imgObj.crossOrigin = "Anonymous";
                            
                            // Wait for the image to load
                            await new Promise((resolve, reject) => {
                                imgObj.onload = resolve;
                                imgObj.onerror = reject;
                                imgObj.src = img.src;
                            });
                            
                            // Set canvas dimensions proportionally to fit PDF width
                            const imgAspectRatio = imgObj.width / imgObj.height;
                            let imgWidth = contentWidth; // Width in mm (PDF)
                            let imgHeight = imgWidth / imgAspectRatio;
                            
                            // If height is too large, scale down
                            const maxImgHeight = 100; // Max height in mm
                            if (imgHeight > maxImgHeight) {
                                imgHeight = maxImgHeight;
                                imgWidth = imgHeight * imgAspectRatio;
                            }
                            
                            // Check if we need a new page for the image
                            if (yPos + imgHeight + 20 > pageHeight - margin) {
                                pdf.addPage();
                                yPos = margin + 10;
                            }
                            
                            // Set canvas dimensions
                            canvas.width = imgObj.width;
                            canvas.height = imgObj.height;
                            
                            // Draw the image to canvas
                            ctx.drawImage(imgObj, 0, 0);
                            
                            // Get image data
                            const imgData = canvas.toDataURL('image/jpeg', 0.75);
                            
                            // Calculate centered position
                            const xPos = margin + (contentWidth - imgWidth) / 2;
                            
                            // Add image to PDF
                            pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight);
                            
                            // Move position down
                            yPos += imgHeight + 5;
                            
                            // Add caption if it exists - FIXED CENTERED VERSION
                            if (caption) {
                                pdf.setFont("Roboto", "normal");
                                pdf.setFontSize(10);
                                pdf.setTextColor(100, 100, 100);
                                
                                const captionLines = pdf.splitTextToSize(caption, contentWidth);
                                
                                // Calculate the center point of the page width
                                const pageCenter = pageWidth / 2;
                                
                                // Use the built-in text alignment options
                                pdf.text(captionLines, pageCenter, yPos, { 
                                    align: 'center',
                                    maxWidth: contentWidth
                                });
                                
                                yPos += captionLines.length * 5 + 10;
                            } else {
                                yPos += 10; // Add some space after the image
                            }
                            
                        } catch (imgError) {
                            console.error('Error processing image:', imgError);
                            // Continue with next image if one fails
                            yPos += 5;
                        }
                    }
                }
            }
            
            // Add some extra space after each section
            yPos += 10;
        }
        
        updateProgress('Finalizing PDF...', 0.9);
        
        // Add footer with page numbers
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFont("Roboto", "normal");
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Generated from Michael Teixeira's Portfolio - tex30.github.io/portfolio`, margin, pageHeight - 10);
            pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10, { align: 'right' });
        }
        
        // Download the PDF
        pdf.save(`${projectTitle.replace(/\s+/g, '-').toLowerCase()}-report-with-images.pdf`);
        hideProgressIndicator();
        
    } catch (error) {
        console.error('Error generating PDF with images:', error);
        hideProgressIndicator();
        alert('An error occurred while generating the PDF with images. Please try the text-only version.');
    }
}

// Show progress indicator with message and progress bar
function showProgressIndicator(message, progress = 0) {
    // Remove any existing indicator
    hideProgressIndicator();
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.id = 'report-progress-indicator';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '100%';
    progressContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    progressContainer.style.display = 'flex';
    progressContainer.style.flexDirection = 'column';
    progressContainer.style.justifyContent = 'center';
    progressContainer.style.alignItems = 'center';
    progressContainer.style.zIndex = '9999';
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.id = 'report-progress-message';
    messageEl.textContent = message || 'Processing...';
    messageEl.style.color = 'white';
    messageEl.style.fontSize = '18px';
    messageEl.style.marginBottom = '20px';
    messageEl.style.fontFamily = 'var(--main-font, Arial, sans-serif)';
    
    // Create progress bar container
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.width = '300px';
    progressBarContainer.style.height = '20px';
    progressBarContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    progressBarContainer.style.borderRadius = '10px';
    progressBarContainer.style.overflow = 'hidden';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'report-progress-bar';
    progressBar.style.width = `${progress * 100}%`;
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = 'var(--primary-color, #4A6FFF)';
    progressBar.style.transition = 'width 0.3s ease';
    
    // Assemble elements
    progressBarContainer.appendChild(progressBar);
    progressContainer.appendChild(messageEl);
    progressContainer.appendChild(progressBarContainer);
    
    // Add to document
    document.body.appendChild(progressContainer);
}

// Update progress indicator
function updateProgress(message, progress) {
    const messageEl = document.getElementById('report-progress-message');
    const progressBar = document.getElementById('report-progress-bar');
    
    if (messageEl && message) {
        messageEl.textContent = message;
    }
    
    if (progressBar && progress !== undefined) {
        progressBar.style.width = `${progress * 100}%`;
    }
}

// Hide progress indicator
function hideProgressIndicator() {
    const existingIndicator = document.getElementById('report-progress-indicator');
    if (existingIndicator) {
        document.body.removeChild(existingIndicator);
    }
}