const tabForm = document.querySelector('#tab-form')
const input = document.querySelector('#tab-name')
const textArea = document.querySelector('#tab-content')
const confirmBtn = document.querySelector('#confirm-btn')

tabForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const tabName = input.value.trim();
    const tabContent = textArea.value.trim();

    if (!tabName || !tabContent) {
        alert('Fill all fields!');
        return;
    }

    const formData = {
        name: tabName,
        content: tabContent,
    };

    try {
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (error) {
        console.error('Error happened:', error)
        alert('Failed to send data to the server.')
    }
})  