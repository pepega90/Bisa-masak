import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import DefaultText from '../components/DefaultText';
import DefaultBoldText from '../components/DefaultBoldText';

const DetailRecipeScreens = ({ navigation }) => {
	const [detailResep, setDetailResep] = useState(null);

	useEffect(() => {
		fetch(
			`https://masak-apa.tomorisakura.vercel.app/api/recipe/${navigation.getParam(
				'resep'
			)}`
		)
			.then(res => res.json())
			.then(data => {
				setDetailResep(data.results);
			});
	}, [navigation]);

	let recipeContent = (
		<DefaultText style={{ textAlign: 'center' }}>Loading...</DefaultText>
	);

	if (detailResep)
		recipeContent = (
			<View>
				<Image
					style={styles.img}
					source={{
						uri:
							detailResep.thumb === null
								? navigation.getParam('img')
								: detailResep.thumb,
					}}
				/>
				<View style={styles.service}>
					<DefaultText style={{ color: '#fff' }}>
						Hidangan: {detailResep.servings}
					</DefaultText>
					<DefaultText style={{ color: '#fff' }}>
						Durasi: {detailResep.times}
					</DefaultText>
					<DefaultText style={{ color: '#fff' }}>
						Kesulitan: {detailResep.dificulty}
					</DefaultText>
				</View>
				<View style={styles.containerResep}>
					<View style={{ marginBottom: 20 }}>
						<DefaultBoldText style={{ fontSize: 16 }}>
							Bahan-Bahan
						</DefaultBoldText>
						{detailResep.ingredient.map(bahan => (
							<DefaultText key={bahan}>{bahan}</DefaultText>
						))}
					</View>
					<View style={styles.stepContainer}>
						<DefaultBoldText style={{ fontSize: 16 }}>
							Langkah Membuat
						</DefaultBoldText>
						{detailResep.step.map(langkah => (
							<DefaultText key={langkah} style={styles.langkah}>
								{langkah}
							</DefaultText>
						))}
					</View>
				</View>
			</View>
		);

	return <ScrollView>{recipeContent}</ScrollView>;
};

DetailRecipeScreens.navigationOptions = navigationData => {
	const title = navigationData.navigation.getParam('title');
	return {
		headerTitle: title,
	};
};

const styles = StyleSheet.create({
	img: {
		width: '100%',
		height: 200,
	},
	service: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
		backgroundColor: '#333',
	},
	containerResep: {
		marginVertical: 10,
		padding: 10,
	},
	langkah: {
		borderWidth: 1,
		borderColor: '#ccc',
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 10,
	},
});

export default DetailRecipeScreens;
