import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

const GridItem = props => {
	return (
		<View style={{ ...styles.gridResep, ...props.style }}>
			<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
				<View>{props.children}</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	gridResep: {
		height: 150,
		elevation: 3,
		padding: 10,
		width: '50%',
	},
});

export default GridItem;
