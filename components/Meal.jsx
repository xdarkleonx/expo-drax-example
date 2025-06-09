import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';
import MIcon from '@expo/vector-icons/MaterialIcons';
import DiaryNutrient from './DiaryNutrient';

const Meal = props => {
  const [isDragMode, setIsDragMode] = useState(false);
  const [nutrients, setNutrients] = useState(props.nutrients);

  const [prevNutrients, setPrevNutrients] = useState(props.nutrients);

  if (props.nutrients !== prevNutrients) {
    setPrevNutrients(props.nutrients);
    setNutrients(props.nutrients);
  }

  const calculateTotal = (nutrients, nutrientName) => {
    if (!nutrients) return 0;

    return nutrients.reduce((result, nutrient) => {
      return nutrient.calculated[nutrientName] !== undefined
        ? result + nutrient.calculated[nutrientName]
        : result;
    }, 0);
  }

  const changeNutrientOrder = (event) => {
    const toIndex = nutrients.findIndex(e => e.id === event.receiver.payload.id);
    const fromIndex = nutrients.findIndex(e => e.id === event.dragged.payload.id);
    const reorderedNutrients = nutrients.slice();
    reorderedNutrients.splice(toIndex, 0, reorderedNutrients.splice(fromIndex, 1)[0]);
    setNutrients(reorderedNutrients);
  }

  const renderDraxNutrients = (isDragMode) => {
    return nutrients?.map((nutrient, index) => {
      return (
        <DraxView
          key={nutrient.id}
          animateSnap={false}
          longPressDelay={100}
          draggable={isDragMode}
          hoverDraggingStyle={styles.dragginDrax}
          receivingStyle={styles.receivingDrax}
          payload={nutrient}
          onReceiveDragDrop={(event) => changeNutrientOrder(event)}
        >
          <DiaryNutrient
            isDraggable={isDragMode}
            mealIndex={props.mealIndex}
            nutrientIndex={index}
            accepted={props.accepted}
            data={nutrient}
          />
        </DraxView>
      )
    })
  }

  // console.log('nutrients', )
  return (
    <View
      style={styles.mainContainer}
      pointerEvents={props.isDraggable ? 'none' : 'auto'}
    >
      <View style={styles.rowContainer}>
        {props.isDraggable &&
          <MIcon
            name='drag-indicator'
            size={15}
            color='#a8b4c4'
          />
        }
        <Text style={styles.mealTitle}>
          {`Meal number ${props.mealIndex + 1}`}
        </Text>
        <TouchableOpacity
          style={styles.rowContainer}
          disabled={props.accepted}
        >
          <MIcon name='access-time' size={20} color='#9da1a7' />
          <Text style={styles.timeText}>
            {props.time ? props.time : '--:--'}
          </Text>
        </TouchableOpacity>
      </View>
      <DraxProvider style={styles.draxProvider}>
        {renderDraxNutrients(isDragMode)}
      </DraxProvider>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          {'Total'}
        </Text>
        <View style={styles.energyValueBox}>
          <Text style={styles.total}>
            {calculateTotal(props.nutrients, 'proteins').toFixed(1)}
          </Text>
          <Text style={styles.total}>
            {calculateTotal(props.nutrients, 'fats').toFixed(1)}
          </Text>
          <Text style={styles.total}>
            {calculateTotal(props.nutrients, 'carbs').toFixed(1)}
          </Text>
          <Text style={styles.total}>
            {calculateTotal(props.nutrients, 'calories')}
          </Text>
          <Text style={styles.total}>
            {calculateTotal(props.nutrients, 'water') || ''}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Meal;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menu: {
    position: 'absolute',
    right: 0,
  },
  energyValueBox: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10
  },
  totalContainer: {
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    marginLeft: 24,
    fontWeight: 'bold',
    fontSize: 13,
  },
  buttonsBox: {
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10
  },
  button: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    borderRadius: 20,
  },
  mealTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 2
  },
  timeText: {
    color: '#9da1a7',
    paddingLeft: 3,
  },
  totalText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  draxProvider: {
    overflow: 'hidden',
    marginTop: 10,
    rowGap: 7
  },
  dragginDrax: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  receivingDrax: {
    backgroundColor: '#e6eaf0'
  },
  modal: {
    marginHorizontal: 20
  }
})