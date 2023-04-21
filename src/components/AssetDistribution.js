import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { CircularProgress, Grid, Typography } from '@mui/material';
import PieChart from './PieChart';

const AssetDistribution = () => {
  const { web3, addressAccount, ethBalance, lockers } = useWeb3Data();
  const [assets, setAssets] = useState([]);
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const populateAssets = async () => {
      if ((ethBalance, lockers, addressAccount)) {
        var tempArr = [];
        lockers.forEach(async (locker) => {
          const balance = await getEthBalance(web3, locker);
          const obj = { account: locker, balance: +balance };
          tempArr.push(obj);
        });
        tempArr.push({ account: addressAccount, balance: +ethBalance });
        setAssets(tempArr);
      }
    };

    const generatePieChartData = () => {
      if (assets) {
        const pieChartData = {
          labels: assets.map((asset) => asset.account),
          datasets: [
            {
              data: assets.map((asset) => asset.balance),
              backgroundColor: ['#076AAB', '#36A2EB', '#68B5E8'],
              hoverBackgroundColor: ['#076AAB', '#36A2EB', '#68B5E8'],
            },
          ],
        };
        setPieChartData(pieChartData);
      }
    };

    populateAssets();
    generatePieChartData();
  }, [ethBalance, lockers, addressAccount, web3]);

  const getEthBalance = async (web3, lockerAddress) => {
    const balance = await web3.eth.getBalance(lockerAddress);
    if (balance) {
      const etherValue = web3.utils.fromWei(balance, 'ether');
      return etherValue;
    } else {
      return 0;
    }
  };

  if (pieChartData.labels.length === 0) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '40vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="h6">Asset Distribution</Typography>
      <div style={{ width: '500px', height: '500px' }}>
        <PieChart pieChartData={pieChartData} />
      </div>
    </>
  );
};

export default AssetDistribution;
