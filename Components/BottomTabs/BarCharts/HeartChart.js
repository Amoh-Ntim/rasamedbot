import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HeartChart = ({ shap }) => {
  if (!shap || Object.keys(shap).length === 0) {
    return <Text>No SHAP values to display</Text>;
  }

  // Extract labels (feature names) and data (SHAP values) from the shap object
  const labels = Object.keys(shap);
  const data = Object.values(shap);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#6e0104",
    backgroundGradientTo: "#b20106",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      transform: [{ rotate: "-90deg" }],
      textAnchor: "end",
      fontSize: 10,
    },
  };

  return (
    <View style={styles.container}>
      <View style={{ transform: [{ rotate: "270deg" }] }}>
        <BarChart
          style={styles.chartStyle}
          data={chartData}
          width={screenHeight}
          height={screenWidth} // Adjusted height to accommodate rotated chart
          chartConfig={chartConfig}
          verticalLabelRotation={0} // Disable rotation to keep labels horizontal after chart rotation
          fromZero={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default HeartChart;
