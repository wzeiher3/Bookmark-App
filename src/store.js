const list = {
    bookmarks: [],
    adding: true,
    error: null,
    filter: 0
}

function findbyId(id){
    console.log(id);
    return this.list.bookmarks.find(currentElement => currentElement.id === id);
}

function addBookmark(bMark){
    this.list.bookmarks.push(bMark);
}

function findAndDelete(id){
    this.list.bookmarks = this.list.bookmarks.filter(currentElement => currentElement.id !== id)
}

function findAndUpdate(id, newData){
    const currentItem = this.findById(id);
    Object.assign(currentItem, newData);
}

const setError = function (error) {
    this.error = error;
};



export default{
    list,
    findbyId, 
    addBookmark, 
    findAndDelete,
    findAndUpdate,
    
    setError
}