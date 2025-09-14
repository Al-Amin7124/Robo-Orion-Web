function openTab(evt, tabId) {
    // Hide all content
    document.querySelectorAll('.tabcontent').forEach(el => el.classList.add('hidden'));
    // Remove active style
    document.querySelectorAll('.tablink').forEach(el => el.classList.remove('text-blue-600','border-blue-600'));
    // Show selected tab
    document.getElementById(tabId).classList.remove('hidden');
    evt.currentTarget.classList.add('text-blue-600','border-blue-600');
}