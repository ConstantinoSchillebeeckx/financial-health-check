/* called 'onload' for the debts slide

assumes a bootstrap row with id inputRow exists,
as well as a column div within the row

*/
function debtInputs() {

    var container = d3.select('#inputRow div')

    var tmp = container.append('div')
        .attr('id','addDebt')
      
    tmp.append('a')
        .attr('href','#')
        .attr('onclick','addDebtRow()')
        .html('<i class="fa fa-plus-square fa-2x text-primary" aria-hidden="true"></i>')
      
    tmp.append('span')
        .html(' Add a debt')

    debtRows = 0;

}



/* add a row of inputs to capture debt status

assumes a bootstrap row with id inputRow exists,
as well as a column div within the row

*/
function addDebtRow() {
    
    var container = d3.select('#inputRow div')

    if (!debtRows) {
        var headerRow = container.insert('div','#addDebt')
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

    }

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
        .attr('name','debt_name-' + debtRows)
        .attr('placeholder','Student loans')
    
    // amount col
    debtRow.append('div')
        .attr('class','col-sm-2')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_amount-' + debtRows)
        .attr('placeholder','50000')

    // rate col
    debtRow.append('div')
        .attr('class','col-sm-2')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_amount-' + debtRows)
        .attr('placeholder', '5.6')

    // min payment col
    debtRow.append('div')
        .attr('class','col-sm-3')
      .append('input')
        .attr('type','number')
        .attr('class','form-control')
        .attr('required',true)
        .attr('name','debt_min_payment-' + debtRows)
        .attr('placeholder', '500')

    // delete row button
    debtRow.append('div')
        .attr('class','col-sm-1')
      .append('a')
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



/* Show the financial health summary for the simple profile

At the end of the financial health questionnaire,
a summary of action points is shown detailing
advice.

Function assumes slide form data is being stored in the
'profile' global var it should have the structure:
    {internal slide ID: {'answer': name of button clicked}}

Also assumes there is a div with id 'slide' into which we place
content.
*/
function generateSimpleFinanceSummary() {

    var text = {
        '/financial-health-check/dat/simple/slide1':{'yes':'Great job saving for a rainy day! This money should be used for short-term emergencies, like your car breaking down or needing to travel for a family emergency. If this fund needs to be used in an emergency, replenishing it should be your highest financial priority.','no':'Put at least $1,000 in a savings account that you can access immediately. This account is for short-term emergencies, like your car breaking down or needing to travel for a family emergency. Building and maintaining this fund should be your highest financial priority.', 'title':'Emergency fund'},
        '/financial-health-check/dat/simple/slide2':{'yes':'Contribute enough money from each paycheck to maximize the 401(k) match provided by your employer. For example, if your employer will match contributions up to 5% of your income, you should contribute 5%. An employer-sponsored 401(k) match provides guaranteed returns on your investment, so this is a very high financial priority!','title':'401(k)'},
        '/financial-health-check/dat/simple/slide3':{'yes':'Always make the minimum payments on all of your debts, and then contribute any remaining available money each month to the debt that has the highest interest rate, until all debts are fully paid. This strategy will save you the most money in the long run. High interest debts (>5%) should always be paid before investing (other than employer-sponsored 401(k) matching programs), since the money you save by reducing the interest on your debts is a guaranteed return.','title':'Debts'},
        '/financial-health-check/dat/simple/slide4':{'no':'Once you have met the above priorities, save six months of living expenses (including all your fixed expenses like rent or mortgage payments and variable expenses including food and utilities) in a savings account that is available to you immediately. Keeping this money in an easily accessible account means that it will accrue very little interest, but it will be available to you in an emergency, like losing your job.','yes':'Great job saving for a rainy day! This money should be used for long-term emergencies, like losing your job. This fund can also be useful for major financial events like down payments on a house or a car, or to help finance a wedding. If these savings are used, the fund should be replenished as soon as possible, after the above priorities are met.','title':'Emergency fund'},
        '/financial-health-check/dat/simple/slide5':{'no':'IRAs are tax-advantaged retirement accounts, similar to the 401(k), but they are independent of your employer, meaning you have a better selection of funds to invest in. Once the above priorities are met, additional money should be contributed to an IRA, up to the yearly contribution limit ($5,500 for people under age 50, $6,500 otherwise). A diversified “three-fund portfolio” of low-cost index funds is recommended for most people. [[Provide link to discussion on fund selection, Roth vs Traditional accounts]]. Be aware that fees associated with IRAs can have a major impact on investment growth and financial service providers vary significantly in their pricing. [[Provide link to comparison of financial service providers, fees, and impact on portfolio growth]].','yes':'Once the above priorities are met, additional money should be contributed to your IRA, up to the yearly contribution limit ($5,500 for people under age 50, $6,500 otherwise). It is recommended that your contributions be invested in a “three-fund portfolio” of low-cost index funds, if they are not already. [[Provide link to discussion on fund selection, Roth vs Traditional accounts]]. Be aware that fees associated with IRAs can have a major impact on investment growth and financial service providers vary significantly in their pricing. [[Provide link to comparison of financial service providers, fees, and impact on portfolio growth]].','title':'IRA'},
        '/financial-health-check/dat/simple/slide6':{'yes':'If you have met all of the above priorities (debts paid off, six months of expenses saved, and IRA contributions maximized), additional money for investment should in most cases be contributed to your 401(k). This type of account is tax-advantaged, making it a higher priority than taxable brokerage accounts, unless the fund selection through your 401(k) is exceptionally poor (read more about fund selection [[here]]). The annual contribution limit to 401(k) accounts is $18,000 for 2016.','title':'Investments'},
        '/financial-health-check/dat/simple/slide7':{'no':'If ALL of the above priorities have been met and you still have additional money to invest, you should open a taxable brokerage account for investments. This sort of account is not tax advantaged like 401(k) or IRA accounts and may carry higher fees. It is recommended that these investments also be placed in low-cost index funds. Be aware that fees associated with brokerage accounts can have a major impact on investment growth and financial service providers vary significantly in their pricing. [[Provide link to comparison of financial service providers, fees, and impact on portfolio growth]].','yes':'If you already have taxable brokerage account, but have not met the above priorities, it may be advantageous to move these funds to an IRA (though you should investigate any fees associated with relocating your investments). If ALL of the above priorities have been met and you still have additional money to invest, you should invest in a taxable brokerage account. This sort of account is not tax advantaged like 401(k) or IRA accounts and may carry higher fees. It is recommended that these investments also be placed in low-cost index funds. Be aware that fees associated with brokerage accounts can have a major impact on investment growth and financial service providers vary significantly in their pricing. [[Provide link to comparison of financial service providers, fees, and impact on portfolio growth]].','title':'Taxable accounts'}

    }

    var container = d3.select('#slide')
        .append('div')
          .attr('class','summary');

    for (var slide in profile) {

        var response = profile[slide].answer;

        if (text[slide] && response in text[slide]) {

            var row = container.append('div')
                .attr('class','row')

/*              
            row.append('div')
                .attr('class','col-sm-1 col-sm-offset-1')
                .html(function(d) { return response =='yes' ? '<i class="fa fa-check-circle-o fa-5x text-success" aria-hidden="true"></i>' : '<i class="fa fa-circle-o fa-5x" aria-hidden="true"></i>' })
  */
          
            var panel = row.append('div')
                .attr('class','col-sm-12')
              .append('div')
                .attr('class','panel panel-default')

            panel.append('div')
                .attr('class','panel-heading')
              .append('h5')
                .html(text[slide].title);

            panel.append('div')
                .attr('class','panel-body')
                .html(text[slide][response]);

        }

    }


}













