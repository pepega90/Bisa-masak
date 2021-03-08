import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	FlatList,
} from 'react-native';

import GridItem from '../components/GridItem';
import DefaultText from '../components/DefaultText';

const RecipeList = ({ navigation }) => {
	const [listResep, setListResep] = useState(null);

	useEffect(() => {
		fetch(
			`https://masak-apa.tomorisakura.vercel.app/api/categorys/recipes/${navigation.getParam(
				'key'
			)}`
		)
			.then(res => res.json())
			.then(data => setListResep(data.results));
	}, [navigation]);

	const recipeItem = resep => {
		return (
			<GridItem
				style={styles.listRecipe}
				onPress={() => {
					navigation.navigate('DetailRecipe', {
						resep: resep.item.key,
						title: resep.item.title,
						img: resep.item.thumb,
					});
				}}>
				<ImageBackground
					style={styles.bgImage}
					source={{ uri: resep.item.thumb }}>
					<View
						style={{
							justifyContent: 'space-between',
							height: '100%',
						}}>
						<View>
							<DefaultText style={styles.text} numberOfLines={1}>
								{resep.item.title}
							</DefaultText>
						</View>
						<View style={styles.service}>
							<DefaultText style={{ color: '#fff' }}>
								Porsi: {resep.item.portion}
							</DefaultText>
							<DefaultText style={{ color: '#fff' }}>
								Durasi: {resep.item.times}
							</DefaultText>
							<DefaultText style={{ color: '#fff' }}>
								Kesulitan: {resep.item.dificulty}
							</DefaultText>
						</View>
					</View>
				</ImageBackground>
			</GridItem>
		);
	};

	return (
		<View style={styles.screen}>
			{listResep !== null ? (
				<FlatList data={listResep} renderItem={recipeItem} />
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
};

RecipeList.navigationOptions = navigationData => {
	const title = navigationData.navigation.getParam('judul');
	return {
		headerTitle: title,
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listRecipe: {
		width: '100%',
		height: 250,
	},
	bgImage: {
		width: '100%',
		height: '100%',
	},
	text: {
		backgroundColor: '#333',
		color: '#fff',
		padding: 5,
	},
	service: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
		backgroundColor: '#333',
	},
});

export default RecipeList;
