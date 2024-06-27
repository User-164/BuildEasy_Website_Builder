document.addEventListener('DOMContentLoaded', (event) => {
    loadWorkspace();
});

// Function to add text element
function addText() {
    const textElement = document.createElement('div');
    textElement.classList.add('element-container');
    textElement.innerHTML = `
        <p contenteditable="true" class="draggable editable">This is a text block. Edit me!</p>
        <button class="delete-button" onclick="deleteElement(this)">x</button>
    `;
    document.getElementById('workspace').appendChild(textElement);
}

// Function to add image element
function addImage() {
    const imgElement = document.createElement('div');
    imgElement.classList.add('element-container');
    imgElement.innerHTML = `
        <img src="placeholder.jpg" alt="Image placeholder" class="draggable resizable" onclick="replaceImage(this)">
        <button class="delete-button" onclick="deleteElement(this)">x</button>
    `;
    document.getElementById('workspace').appendChild(imgElement);
}

// Function to replace image on click
function replaceImage(imgElement) {
    const newSrc = prompt('Enter new image URL:');
    if (newSrc) {
        imgElement.src = newSrc;
    }
}

// Function to add new section
function addSection() {
    const sectionElement = document.createElement('div');
    sectionElement.classList.add('element-container');
    sectionElement.innerHTML = `
        <div contenteditable="true" class="draggable editable section">
            <h3>New Section</h3>
            <p>This is a new section. Add content here!</p>
        </div>
        <button class="delete-button" onclick="deleteElement(this)">x</button>
    `;
    document.getElementById('workspace').appendChild(sectionElement);
}

// Function to delete an element
function deleteElement(button) {
    button.parentElement.remove();
}

// Function to save workspace state to localStorage
function saveWorkspace() {
    const workspace = document.getElementById('workspace').innerHTML;
    localStorage.setItem('workspace', workspace);
}

// Function to load workspace state from localStorage
function loadWorkspace() {
    const savedWorkspace = localStorage.getItem('workspace');
    if (savedWorkspace) {
        document.getElementById('workspace').innerHTML = savedWorkspace;
    }
}

// Interact.js to make elements draggable and resizable
interact('.draggable').draggable({
    onmove: function (event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
});

interact('.resizable').resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
        move(event) {
            let { x, y } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`
            });

            Object.assign(event.target.dataset, { x, y });
        }
    }
});
