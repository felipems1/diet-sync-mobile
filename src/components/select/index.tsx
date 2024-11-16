import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '@/src/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

interface OptionsProps {
  label: string
  value: string | number
}

interface SelectProps {
  name: string
  control: any
  placeholder?: string
  error?: string
  options: OptionsProps[]
}

export function Select(props: SelectProps) {
  const [visible, setVisible] = useState(false)

 return (
   <View style={styles.container}>
      <Controller 
        control={props.control} 
        name={props.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
              <Text>
                {value ? props.options.find(option => option.value === value)?.label : props.placeholder}
              </Text>
              <Feather name='arrow-down' size={16} color={colors.textPrimary} />
            </TouchableOpacity>

            <Modal 
              visible={visible}
              animationType='fade'
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={props.options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value)
                          setVisible(false)
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}  
      />
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#ddd',
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 20
  },
  option: {
    paddingVertical: 12,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8
  },
  errorText: {
    color: colors.red,
    marginTop: 4
  },
})