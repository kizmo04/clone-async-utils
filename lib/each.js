/*

  < Parameters >

  @collection {Array|Object}
    - A collection to iterate over
  @iteratee {AsyncFunction}
    - An async function to apply to each item in collection. Invoked with (item, callback).
      The array index is NOT passed to the iteratee.
  @callback {function<optional>}
    - A callback which is called when all iteratee functions have finished, or an error occurs.
      Invoked with (error).

  < Example >

  // assuming openFiles is an array of file names and saveFile is a function
  // to save the modified contents of that file:

  async.each(openFiles, saveFile, function(err){
    // if any of the saves produced an error, err would equal that error
  });

  // assuming openFiles is an array of file names
  async.each(openFiles, function(file, callback) {

      // Perform operation on file here.
      console.log('Processing file ' + file);

      if( file.length > 32 ) {
        console.log('This file name is too long');
        callback('File name too long');
      } else {
        // Do work to process file here
        console.log('File processed');
        callback();
      }
  }, function(err) {
      // if any of the file processing produced an error, err would equal that error
      if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A file failed to process');
      } else {
        console.log('All files have been processed successfully');
      }
  });

 */
export default function each (collection, iteratee, callback) {

}
