const contentSection = document.querySelector('.content-section');
const tabs = document.querySelector('.tabs');
const tabContent = document.querySelector('.tab-content');
let data = [];

const tabsCreation = (data) => {
    tabs.innerHTML = ''; 

    data.forEach((tabData) => {
        const tab = document.createElement('div');
        tab.classList.add('tab');
        
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(element => {
                element.classList.remove('active');
            });

            tab.classList.add('active');

            const content = tabContent.querySelector('p');
            if (content) {
                content.textContent = tabData.content;
            } else {
                const newContent = document.createElement('p');
                newContent.textContent = tabData.content;
                tabContent.appendChild(newContent);
            }
        });

        const content = document.createElement('p');
        content.textContent = tabData.name;
        tab.appendChild(content);
        tabs.appendChild(tab);
    });
};

const loadTabs = async () => {
    try {
        const response = await fetch('/api/get');
        data = await response.json();
        tabsCreation(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const updateTabs = async () => {
    try {
        const response = await fetch('/api/get');
        const newData = await response.json();

        if (JSON.stringify(newData) !== JSON.stringify(data)) {
            data = newData;
            tabsCreation(data);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

setInterval(updateTabs, 5000);

window.onload = loadTabs;
