import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	DraxList,
	DraxListItem,
	DraxProvider,
} from 'react-native-drax';
import Meal from '../components/Meal';

const FOOD_DIARY_DAY = {
	date: new Date(),
	meals: [
		{
			accepted: false,
			nutrients: [
				{
					id: '1vgBeh5NaaUaNFrhhKuM',
					calculated: { calories: 158, carbs: 2.41, fats: 11.1, proteins: 13, water: 74 },
					energyValue: { calories: 158, carbs: 2.41, fats: 11.1, proteins: 13, water: 74 },
					photoPath: 'nutrients%2Fimage-ed5bba8f-5763-4b16-a464-ff7510d0946f',
					category: 'eggs',
					name: 'quail egg',
					heatTreatment: false,
					species: 'product',
					weight: 100,
				},
				{
					id: '0DE0wMReeCGRZ3q4RmGz',
					calculated: { calories: 177, carbs: 0, fats: 6.78, proteins: 27.12, water: 65 },
					energyValue: { calories: 177, carbs: 0, fats: 6.78, proteins: 27.12, water: 65 },
					photoPath: 'nutrients%2Fimage-045d8b87-52c1-413d-a0de-83290ad44f82',
					category: 'beefAndVeal',
					name: 'Beef round part shank steak grilled',
					heatTreatment: false,
					species: 'product',
					weight: 100,
				}
			]
		},
		{
			accepted: false,
			nutrients: [
				{
					id: '21Plg459dqFC1PWQdVdV',
					calculated: { calories: 34, carbs: 4.92, fats: 0.08, proteins: 3.43, water: 91 },
					energyValue: { calories: 34, carbs: 4.92, fats: 0.08, proteins: 3.43, water: 91 },
					photoPath: 'nutrients%2Fimage-5c73a35f-d5c3-49c1-97a4-b10c093a6481',
					category: 'milkProducts',
					name: 'Skim milk with vitamins A and D',
					heatTreatment: false,
					species: 'product',
					weight: 100,
				},
			]
		}
	]
}

const MealsDragDrop = () => {
	const [isDragMode, setIsDragMode] = useState(true);
	const [diary, setDiary] = useState(FOOD_DIARY_DAY);

	const onMealReorder = async (fromIndex, toIndex) => {
		const newData = [...diary.meals];
		const item = newData.splice(fromIndex, 1)[0];
		newData.splice(toIndex, 0, item);
		setDiary({ ...diary, meals: newData });
	}

	const renderHeader = () => {
		return (
			<View style={styles.headerBox}>
				<Text style={styles.headerText}>
					Header
				</Text>
			</View>
		)
	}

	const renderEmpty = () => {
		return (
			<Text>
				No meals
			</Text>
		)
	}

	const renderMeals = (info, itemProps) => {
		return (
			<DraxListItem
				itemProps={itemProps}
				animateSnap={false}
				draggable={isDragMode}
			>
				<Meal
					isDraggable={isDragMode}
					mealIndex={info.index}
					time={info.item.time}
					alarmId={info.item.alarmId}
					nutrients={info.item.nutrients}
					accepted={info.item.accepted}
				/>
			</DraxListItem>
		)
	}

	return (
		<DraxProvider>
			<SafeAreaView
				edges={['left', 'right']}
				style={styles.container}
			>
				<DraxList
					ListEmptyComponent={renderEmpty}
					ListHeaderComponent={renderHeader}
					directionalLockEnabled={!isDragMode}
					overScrollMode='never'
					longPressDelay={100}
					showsVerticalScrollIndicator={false}
					data={diary.meals}
					renderItem={renderMeals}
					onItemReorder={({ fromIndex, toIndex }) => onMealReorder(fromIndex, toIndex)}
				/>
			</SafeAreaView>
		</DraxProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerBox: {
		backgroundColor: 'gray',
		justifyContent: 'center',
		height: 200
	},
	headerText: {
		color: 'white',
		alignSelf: 'center'
	}
})

export default MealsDragDrop;
