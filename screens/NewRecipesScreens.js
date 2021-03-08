import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
	Button,
	TouchableOpacity,
} from 'react-native';

import GridItem from '../components/GridItem';

const NewRecipesScreens = props => {
	const [newRecipes, setNewRecipes] = useState(null);

	useEffect(() => {
		fetch('https://masak-apa.tomorisakura.vercel.app/api/recipes')
			.then(res => res.json())
			.then(data => setNewRecipes(data.results));
	}, []);

	const recipeItem = resep => {
		return (
			<GridItem
				onPress={() => {
					props.navigation.navigate('DetailRecipe', {
						resep: resep.item.key,
						title: resep.item.title,
						img: resep.item.thumb,
					});
				}}>
				<ImageBackground
					style={styles.bgImage}
					source={{ uri: resep.item.thumb }}>
					<Text style={styles.text} numberOfLines={2}>
						{resep.item.title}
					</Text>
				</ImageBackground>
			</GridItem>
		);
	};
	return (
		<View style={styles.screen}>
			{newRecipes !== null ? (
				<FlatList
					data={newRecipes}
					renderItem={recipeItem}
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
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	text: {
		backgroundColor: '#333',
		color: '#fff',
		padding: 5,
	},
});

export default NewRecipesScreens;
