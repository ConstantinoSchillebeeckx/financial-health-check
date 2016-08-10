/* called 'onload' for the debts slide

assumes a bootstrap row with id inputRow exists,
as well as a column div within the row

*/
function debtInputs() {

    var container = d3.select('#inputRow div')

    debtRows = 0;

    var headerRow = container.append('div')
        .attr('class','row')

    headerRow.append('div')
        .attr('class','col-sm-3')
        .html('<label>Name</label>')

    headerRow.append('div')
        .attr('class','col-sm-2')
        .html('<label>Amount</label>')

    headerRow.append('div')
        .attr('class','col-sm-2')
        .html('<label>Rate (%)</label>')

    headerRow.append('div')
        .attr('class','col-sm-3')
        .html('<label>Min. payment</label>')

    container.append('a')
        .attr('href','#')
        .attr('onclick','addDebtRow()')
        .attr('id','addDebt')
        .html('<i class="fa fa-plus-square fa-2x text-primary" aria-hidden="true"></i>')

    addDebtRow(); // add first row
}



/* add a row of inputs to capture debt status

assumes a bootstrap row with id inputRow exists,
as well as a column div within the row

*/
function addDebtRow() {
    
    var container = d3.select('#inputRow div')

    var debtRow = container.insert('div', "#addDebt")
        .attr('class','row form-group')
        .attr('id','debt-' + debtRows);
   
    // name col 
    debtRow.append('div')
        .attr('class','col-sm-3')
      .append('input')
        .attr('type','text')
        .attr('class','form-control')
        .attr('required',true)
        .attr('pattern','[a-zA-Z0-9 ]+')
        .attr('title','Only numbers, letters and spaces are allowed')
        .attr('name','debt_name')
        .attr('placeholder','Student loans')
    
    // amount col
    debtRow.append('div')
        .attr('class','col-sm-2')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_amount')
        .attr('placeholder','50000')

    // rate col
    debtRow.append('div')
        .attr('class','col-sm-2')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_amount')
        .attr('placeholder', '5.6')

    // min payment col
    debtRow.append('div')
        .attr('class','col-sm-3')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_min_payment')
        .attr('placeholder', '500')

    // delete row button
    debtRow.append('a')
        .attr('class','text-danger')
        .attr('href','#')
        .attr('onclick','deleteRow(' + debtRows + ')')
        .html('<i class="fa fa-times-circle-o fa-2x delete-row" aria-hidden="true"></i>')

    debtRows += 1;
}


// will remove row of inputs given the id
// id will reference a row labeld 'debt-id'
// we don't decrement debtRows in case user
// deletes and adds a row.  debtRows is meant
// as a unique identifier, not to keep track of
// how many debts are entered
function deleteRow(id) {

    d3.select('#debt-' + id).remove();

}




