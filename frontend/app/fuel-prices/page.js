"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/system';
import MainLayout from '../MainLayout';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StyledContainer = styled(Container)`
  padding: 2rem;
`;

const StyledGridItem = styled(Grid)`
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  transition: transform 0.2s;
  height: 150px; /* Set a fixed height for the cards */
  overflow: hidden; /* Hide overflow content */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled(Typography)`
  color: #1a73e8;
`;

export default function FuelPrices() {
  const [fuelData, setFuelData] = useState([]);
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchFuelData = async () => {
        try {
          const response = await axios.get('/api/fuel-prices');
          const latestFuelPrice = await axios.get('/api/fuel-prices/latest');
          console.log('latestFuelPrice:', latestFuelPrice.data);
          setFuelData(latestFuelPrice.data.data.stations);

          const historicalData = response.data.data;
          const prices = historicalData.map(item => ({
            timestamp: item.timestamp,
            average: item.keskiarvo,
          }));

          setChartData({
            series: [
              {
                name: "Average Price",
                data: prices.map(item => parseFloat(item.average)),
              },
            ],
            options: {
              chart: {
                type: 'line',
                height: 350,
                zoom: {
                  enabled: true,
                  type: 'x', // Enable zooming along the x-axis
                  autoScaleYaxis: true, // Automatically adjust the y-axis when zooming
                },
                toolbar: {
                  autoSelected: 'zoom', // Enable zoom tool by default
                  tools: {
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true, // Add a reset button to reset the zoom
                  },
                },
              },
              title: {
                text: 'Historical Fuel Prices',
                align: 'left',
                style: {
                  fontSize: '24px',
                  color: '#1a73e8',
                },
              },
              xaxis: {
                categories: prices.map(item => dayjs(item.timestamp).format('dddd')),
              },
              yaxis: {
                title: {
                  text: 'Price (€)',
                },
              },
              tooltip: {
                theme: 'dark',
              },
              markers: {
                size: 5, // Size of the markers
                colors: ['#1a73e8'], // Color of the markers
                strokeColors: '#fff', // Border color of the markers
                strokeWidth: 2, // Border width of the markers
                hover: {
                  size: 7, // Size of the markers on hover
                },
              },
            },
          });

          setTimestamp(dayjs(latestFuelPrice.timestamp).format('YYYY-MM-DD HH:mm:ss'));
        } catch (error) {
          console.error('Error fetching fuel data:', error);
        }
      };
      fetchFuelData();
    }
  }, []);

  // Log fuelData state whenever it changes
  useEffect(() => {
    console.log('fuelData:', fuelData);
  }, [fuelData]);

  return (
    <MainLayout>
      <StyledContainer>
        <Header variant="h4" component="h1" gutterBottom>
          Fuel Prices
        </Header>
        <Grid container spacing={3}>
          {fuelData.map((station, index) => (
            <StyledGridItem item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {station.station}
                  </Typography>
                  <Typography variant="h5" component="p" color={station.price < 1.5 ? 'green' : 'red'}>
                    Price: {station.price} €
                  </Typography>
                  <Typography variant="p" component="p">
                    Updated: {station.updated}
                  </Typography>
                </CardContent>
              </StyledCard>
            </StyledGridItem>
          ))}
        </Grid>
        <div style={{ marginTop: '2rem' }}>
          <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
      </StyledContainer>
    </MainLayout>
  );
}