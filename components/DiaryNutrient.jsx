import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MIcon from '@expo/vector-icons/MaterialIcons';
import FA5Icon from '@expo/vector-icons/FontAwesome5';
import MCIcon from '@expo/vector-icons/MaterialCommunityIcons';

export const getPhotoUrl = (path) => {
  return `https://firebasestorage.googleapis.com/v0/b/sportbook-2019.appspot.com/o/${path}?alt=media`;
}

const DiaryNutrient = props => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={[styles.mainContainer, props.style]}>
        {props.isDraggable &&
          <MIcon name='drag-indicator' size={15} color='#a8b4c4' />
        }
        <View style={styles.image}>
          {props.data.photoPath
            ? <Image
              style={styles.image}
              source={{ uri: getPhotoUrl(props.data.photoPath) }}
            />
            : props.data.species === 'product'
              ? <FA5Icon name='apple-alt' size={18} color='#2566d4' />
              : <MCIcon name='room-service' size={20} color='#2566d4' />
          }
        </View>
        <View style={styles.nutrientInfo}>
          <View style={styles.nameBox}>
            <Text
              ellipsizeMode='tail'
              numberOfLines={1}
              style={styles.name}
            >
              {props.data.name}
            </Text>
            <Text style={styles.weight}>
              {`${props.data?.weight} gr`}
            </Text>
            <Text style={styles.greyText}>
              {`${props.data?.heatTreatment}, treatment`}
            </Text>
          </View>
          {props.data.additionNutrients?.length &&
            <View style={styles.additionNutrientContainer}>
              {props.data.additionNutrients.map((nutrient, index) => {
                return (
                  <View
                    key={index}
                    style={styles.additionNutrientBox}
                  >
                    <View style={styles.additionNutrientPhotoBox}>
                      <Text style={styles.plus}>+</Text>
                      <View style={styles.smallImage}>
                        {nutrient.photoPath
                          ? <Image
                            style={styles.smallImage}
                            source={{ uri: getPhotoUrl(nutrient.photoPath) }}
                          />
                          : props.data.species === 'product'
                            ? <FA5Icon name='apple-alt' size={12} color='#2566d4' />
                            : <MCIcon name='room-service' size={20} color='#2566d4' />
                        }
                      </View>
                    </View>
                    <View style={styles.additionNutrientText}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.name}
                      >
                        {nutrient.name}
                      </Text>
                      <Text style={styles.greyText}>
                        {` ${nutrient.weight} gr ${nutrient.heatTreatment ? ', treatment' : null}`}
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
          }
          <View style={styles.countContainer}>
            <View style={styles.count}>
              <Text style={styles.roundProteins}>
                p
              </Text>
              <Text style={styles.value}>
                {props.data.calculated?.proteins.toFixed(1)}
              </Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.round}>
                f
              </Text>
              <Text style={styles.value}>
                {props.data.calculated?.fats.toFixed(1)}
              </Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.roundCarbs}>
                c
              </Text>
              <Text style={styles.value}>
                {props.data.calculated?.carbs.toFixed(1)}
              </Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.round}>
                k
              </Text>
              <Text style={styles.value}>
                {props.data.calculated?.calories}
              </Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.round}>
                w
              </Text>
              <Text style={styles.value}>
                {props.data.calculated?.water || '-'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DiaryNutrient;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameBox: {
    flexDirection: 'row',
  },
  name: {
    maxWidth: '63%',
    color: '#4f6488',
  },
  weight: {
    marginLeft: 5,
    color: '#9da1a7',
  },
  greyText: {
    color: '#9da1a7',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    alignItems: 'center',
  },
  count: {
    flex: 1,
    flexDirection: 'row',
  },
  round: {
    textAlign: 'center',
    backgroundColor: '#f0f0f1',
    color: '#4f6488',
    width: 18,
    height: 18,
    marginRight: 4,
    borderRadius: 9,
    fontSize: 13,
    lineHeight: 16,
  },
  roundProteins: {
    textAlign: 'center',
    backgroundColor: '#f0f0f1',
    color: '#4f6488',
    width: 18,
    height: 18,
    marginRight: 4,
    borderRadius: 9,
    fontSize: 13,
    lineHeight: 17,
  },
  roundCarbs: {
    textAlign: 'center',
    backgroundColor: '#f0f0f1',
    color: '#4f6488',
    width: 18,
    height: 18,
    marginRight: 4,
    borderRadius: 9,
    fontSize: 13,
    lineHeight: 15,
  },
  value: {
    fontSize: 13,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f4f7'
  },
  smallImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f4f7',
  },
  nutrientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  plus: {
    marginRight: 5,
  },
  additionNutrientContainer: {
    marginTop: 5,
    rowGap: 5,
  },
  additionNutrientPhotoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  additionNutrientBox: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  additionNutrientText: {
    marginLeft: 10,
    flexDirection: 'row',
    flex: 1,
  },
})