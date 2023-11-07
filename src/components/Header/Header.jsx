import { useSelector } from 'react-redux';
import './Header.css';


function Header() {
  const sumAssets = useSelector((state) => state.assets.assetsSum.sumAssets);
  const sumLiabilities = useSelector((state) => state.liabilities.liabilitiesSum.sumLiabilities);
  const balanceDifference = sumAssets - sumLiabilities;


  return (
    <header className="header">
      <h1 className="header-title">Budget with Interest!</h1>
      <div className="balance-container" style={{ textAlign: 'center' }}>
        <h1 className='balance'>Total Balance: ${balanceDifference}</h1>
      </div>
    </header>
  );
}


export default Header;


