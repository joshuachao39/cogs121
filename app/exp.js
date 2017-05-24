
setSearchText(event) {
 let searchText = event.nativeEvent.text;
 this.setState({searchText});

 base.fetch(‘notes’, {
   context: this,
   asArray: true,
   then(data){
     let filteredData = this.filterNotes(searchText, data);
     this.setState({
       dataSource: this.ds.cloneWithRows(filteredData),
       rawData: data,
     });
   }
 });
}

filterNotes(searchText, notes) {
  let text = searchText.toLowerCase();

  return filter(notes, (n) => {
    let note = n.body.toLowerCase();
    return note.search(text) !== -1;
  });
}
