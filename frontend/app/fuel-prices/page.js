"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent } from '@mui/material'; 
import { Grid } from '@mui/material';
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
          const lastElement = response.data.data[response.data.data.length - 1];
          setFuelData(lastElement.stations);

          const historicalData = response.data.data;
          const prices = historicalData.map(item => ({
            timestamp: item.timestamp,
            average: item.keskiarvo,
          }));

          setTimestamp(dayjs(lastElement.timestamp).format('ddd, DD.MM HH:mm'));

          setChartData({
            series: [{
              name: 'Average Price',
              data: prices.map(price => ({ x: new Date(price.timestamp), y: price.average })),
            }],
            options: {
              chart: {
                type: 'line',
                height: 350,
              },
              title: {
                text: 'Historical Average Fuel Prices',
                align: 'left',
              },
              xaxis: {
                type: 'datetime',
                labels: {
                  formatter: (value) => dayjs(value).format('ddd, DD.MM HH:mm'),
                },
                title: {
                  text: 'Date',
                },
              },
              yaxis: {
                title: {
                  text: 'Average Price (€)',
                },
              },
              tooltip: {
                enabled: true,
                theme: 'dark',
                y: {
                  formatter: (value) => `€ ${value}`,
                },
              },
              markers: {
                size: 5,
                hover: {
                  sizeOffset: 3,
                }
              }
            },
          });

        } catch (error) {
          console.error('Error fetching fuel data:', error);
        }
      };
      fetchFuelData();
    }
  }, []);

  return (
    <MainLayout>
      <StyledContainer>
        <Header variant="h4" component="h1" gutterBottom>
          {`Cheapest Fuel Prices - Tampere - ${timestamp}`}
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
