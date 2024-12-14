// Papers loading and display functionality
async function loadPapers() {
    try {
        const response = await fetch('/data/papers.json');
        const papers = await response.json();
        displayPapers(papers);
    } catch (error) {
        console.error('Error loading papers:', error);
        displayError();
    }
}

function displayPapers(papers) {
    const papersContainer = document.getElementById('papers-container');
    if (!papersContainer) return;

    papersContainer.innerHTML = '';
    
    papers.forEach(paper => {
        const paperCard = createPaperCard(paper);
        papersContainer.appendChild(paperCard);
    });
}

function createPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'paper-card';

    const title = document.createElement('h3');
    title.className = 'paper-title';
    title.textContent = paper.title;

    const authors = document.createElement('div');
    authors.className = 'paper-authors';
    authors.textContent = paper.authors.join(', ');

    const date = document.createElement('div');
    date.className = 'paper-date';
    date.textContent = new Date(paper.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    const abstract = document.createElement('div');
    abstract.className = 'paper-abstract';
    abstract.textContent = paper.abstract;

    const tags = document.createElement('div');
    tags.className = 'paper-tags';
    paper.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'paper-tag';
        tagSpan.textContent = tag;
        tags.appendChild(tagSpan);
    });

    const link = document.createElement('a');
    link.className = 'paper-link';
    link.href = `/papers/${paper.pdf}`;
    link.textContent = 'Download PDF';
    link.target = '_blank';

    card.appendChild(title);
    card.appendChild(authors);
    card.appendChild(date);
    card.appendChild(abstract);
    card.appendChild(tags);
    card.appendChild(link);

    return card;
}

function displayError() {
    const papersContainer = document.getElementById('papers-container');
    if (!papersContainer) return;

    papersContainer.innerHTML = `
        <div class="paper-card">
            <h3 class="paper-title">Error Loading Papers</h3>
            <p class="paper-abstract">Sorry, we couldn't load the papers at this time. Please try again later.</p>
        </div>
    `;
}

// Initialize papers loading when the DOM is ready
document.addEventListener('DOMContentLoaded', loadPapers);