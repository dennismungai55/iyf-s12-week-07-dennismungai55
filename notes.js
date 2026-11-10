
// Get HTML elements
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load saved notes from localStorage
let notes = JSON.parse(localStorage.getItem("myNotes")) || [];

// Save notes
function saveNotes() {
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

// Display notes
function displayNotes() {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const noteText = document.createElement("p");
        noteText.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        });

        noteDiv.appendChild(noteText);
        noteDiv.appendChild(deleteBtn);

        notesList.appendChild(noteDiv);
    });
}

// Add a new note
addNoteBtn.addEventListener("click", () => {
    const note = noteInput.value.trim();

    if (note === "") {
        alert("Please write a note first!");
        return;
    }

    notes.push(note);

    saveNotes();

    noteInput.value = "";

    displayNotes();
});

// Display saved notes when page opens
displayNotes();
