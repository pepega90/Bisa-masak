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

const ArtikelGayaHidup = ({ navigation }) => {
	const [gayaHidup, setGayaHidup] = useState(null);

	useEffect(() => {
		fetch(
			'https://masak-apa-tomorisakura.vercel.app/api/categorys/article/makanan-gaya-hidup'
		)
			.then(res => res.json())
			.then(data => setGayaHidup(data.results));
	}, [navigation]);

	const artikelGayaHidup = artikel => {
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
			{gayaHidup === null ? (
				<DefaultText>Loading...</DefaultText>
			) : (
				<FlatList data={gayaHidup} renderItem={artikelGayaHidup} />
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

export default ArtikelGayaHidup;
