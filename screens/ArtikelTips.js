import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
} from 'react-native';

import GridItem from '../components/GridItem';
import DefaultText from '../components/DefaultText';

const ArtikelTips = ({ navigation }) => {
	const [tips, setTips] = useState(null);

	useEffect(() => {
		fetch(
			'https://masak-apa-tomorisakura.vercel.app/api/categorys/article/tips-masak'
		)
			.then(res => res.json())
			.then(data => setTips(data.results));
	}, [navigation]);

	const artikelTips = artikel => {
		return (
			<GridItem
				style={{ width: '100%', height: 200 }}
				onPress={() => {
					navigation.navigate('DetailArtikel', {
						tag: artikel.item.tags,
						key: artikel.item.key,
					});
				}}>
				<ImageBackground
					style={styles.bgImage}
					source={{ uri: artikel.item.thumb }}>
					<DefaultText style={styles.text} numberOfLines={1}>
						{artikel.item.title}
					</DefaultText>
				</ImageBackground>
			</GridItem>
		);
	};

	return (
		<View style={styles.screen}>
			{tips === null ? (
				<DefaultText>Loading...</DefaultText>
			) : (
				<FlatList data={tips} renderItem={artikelTips} />
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

export default ArtikelTips;
