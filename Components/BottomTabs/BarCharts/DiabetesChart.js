import React from 'react';
import { View, Dimensions, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const wrapLabel = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return text.match(regex).join('\n'); // Adds a newline character after each chunk of maxLength
};

const DiabetesChart = ({ shap }) => {
  if (!shap || Object.keys(shap).length === 0) {
    return <Text>No SHAP values to display</Text>;
  }

  const labels = Object.keys(shap);
  const data = Object.values(shap);

  const chartData = {
    labels: labels.map(() => ''), // Hide default chart labels
    datasets: [
      {
        data: data,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#ffd8bb",
    backgroundGradientTo: "#ffe1cb",
    decimalPlaces: 2, 
    color: (opacity = 1) => `rgba(110, 47, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView horizontal> */}
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <BarChart
            style={styles.chartStyle}
            data={chartData}
            width={screenHeight} 
            height={200} // Adjusted height to accommodate rotated chart
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true}
          />
          <View style={styles.labelsContainer}>
            {labels.map((label, index) => (
              <Text key={index} style={styles.customLabel}>
                {wrapLabel(label, 5)}
              </Text>
            ))}
          </View>
        </View>
      {/* </ScrollView> */}
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
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 86,
    paddingHorizontal: 10,
    width: screenHeight - 100, // Match the width of the chart
  },
  customLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000000', // Set text color
  },
});

export default DiabetesChart;
