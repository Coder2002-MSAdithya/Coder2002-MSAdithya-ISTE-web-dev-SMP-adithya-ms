const notesContainer = document.querySelector("main")
const addNoteBtn = document.querySelector(".add-note")

function getNotes()
{
    return JSON.parse(localStorage.getItem("sticky-notes")) || []
}

function saveNotes(notes)
{
    localStorage.setItem("sticky-notes", JSON.stringify(notes))
}

function addNote()
{
    const existingNotes = getNotes()
    const newNote = {
        id: Math.floor(Math.random() * 10000),
        content: "This is a new note"
    }

    const noteElement = createNoteElement(newNote.id, newNote.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)

    existingNotes.push(newNote)
    saveNotes(existingNotes)
}

function updateNote(id, newContent)
{
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id === id)[0]
    targetNote.content = newContent
    saveNotes(notes)
}

function deleteNote(id, element)
{
    const notes = getNotes().filter(note => note.id !== id)
    saveNotes(notes)
    notesContainer.removeChild(element)
}

function createNoteElement(id, content)
{
    const noteElement = document.createElement("textarea")
    noteElement.classList.add("note")
    noteElement.value = content

    noteElement.addEventListener("change", () => updateNote(id, noteElement.value))
    noteElement.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete the note?")
        if(doDelete)
        {
            deleteNote(id, noteElement)
        }
    })

    return noteElement
}

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)
})

addNoteBtn.addEventListener("click", () => {
    addNote()
})