import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableNativeWithoutFeedback,
} from 'react-native';

import DefaultBoldText from '../components/DefaultBoldText';
import GridItem from '../components/GridItem';

let warna = [
	'#f5428d',
	'#f54242',
	'#f5a442',
	'#f5d142',
	'#368dff',
	'#41d95d',
	'#9eecff',
	'#b9ffb0',
	'#ffc7ff',
];

const CategoryRecipeScreens = props => {
	const [categoriResep, setCategoriResep] = useState(null);

	useEffect(() => {
		fetch('https://masak-apa.tomorisakura.vercel.app/api/categorys/recipes')
			.then(res => res.json())
			.then(data => {
				setCategoriResep(data.results);
			})
			.catch(err => console.log(err));
	}, []);

	const kategori = cat => {
		return (
			<GridItem
				onPress={() =>
					props.navigation.navigate('RecipeList', {
						key: cat.item.key,
						judul: cat.item.category,
					})
				}
				key={Math.random()}
				style={{
					backgroundColor: warna[cat.index],
					margin: 10,
					width: 185,
					borderRadius: 5,
				}}>
				<DefaultBoldText style={styles.text} numberOfLines={1}>
					{cat.item.category}
				</DefaultBoldText>
			</GridItem>
		);
	};

	return (
		<View style={styles.screen}>
			{categoriResep !== null || categoriResep === undefined ? (
				<FlatList
					data={categoriResep}
					renderItem={kategori}
					numColumns={2}
				/>
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
	},
});

export default CategoryRecipeScreens;
