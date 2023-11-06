import React from 'react';


function InfoPage() {
  return (
    <div className="container">
      <h2>User's Guide</h2>
      
        <div className="grid-col grid-col_8">
          <p>
            <h3>Calculator</h3>
            The calculator is the motivational page. Do you have some extra income
            at the end of the month? Add the amount to the calculator and see how
            much it would be worth in ten years if you invested it. You can check 
            any purchase here to help you decide on budgeting for your future!
          </p>

          <p>
            <h3>Assets</h3>
            Assets are classified as incoming currency in the budget. This is where you
            add any money you make this month, be it from wages or side gigs.

            The Assets page will keep a total of monthly income at the bottom of the page 
            and this amount will be used in the Total Balance calculation at the top of 
            the page.

            You can add new Assets here and delete unused ones. They are saved under your
            unique ID so other users cannot see what you make.

            Name and Value are required fields when creating a new Asset, notes are optional.
          </p>

          <p>
            <h3>Liabilities</h3>
            Liabilities are classified as outgoing currency in the budget. This is where you
            add any payments you make this month, be it bills, purchases, or savings.

            Like the Assets page, the Liabilities page will keep a total of monthly income at
            the bottom of the page and this amount will be used in the Total Balance calculation
            at the top of the page.

            You can add new Liabilities here and delete unused ones. They are saved under your
            unique ID so other users cannot see what you spend your money on. There is also a 
            feature to toggle between required and discretionary spending to help you decide 
            where you can make cuts to balance your budget.

            Name and Value are required fields when creating a new Liability, notes are optional 
            and default setting is discretionary.
          </p>

          <p>
            <h3>Favorites</h3>
            The Favorites section is where you can create a library of entries that you may not
            use every month. This will help you remember details such as notes and values.

            Name and Value are required fields when creating a new Favorites, notes are optional.
          </p>
        </div>
      
    </div>
  );
}

export default InfoPage;
