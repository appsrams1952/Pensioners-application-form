import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

type Routine = {
  id: string;
  name: string;
  completed: boolean;
};

const defaultRoutines = [
  'Drink water',
  'Morning stretch',
  'Walk for 20 minutes',
  'Read for 15 minutes'
];

export default function App() {
  const [routines, setRoutines] = useState<Routine[]>(
    defaultRoutines.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name,
      completed: false
    }))
  );
  const [newRoutine, setNewRoutine] = useState('');

  const completedCount = useMemo(
    () => routines.filter((routine) => routine.completed).length,
    [routines]
  );

  const addRoutine = () => {
    const trimmedName = newRoutine.trim();
    if (!trimmedName) {
      return;
    }

    setRoutines((current) => [
      ...current,
      {
        id: `${Date.now()}-${trimmedName}`,
        name: trimmedName,
        completed: false
      }
    ]);
    setNewRoutine('');
  };

  const toggleRoutine = (id: string) => {
    setRoutines((current) =>
      current.map((routine) =>
        routine.id === id
          ? {
              ...routine,
              completed: !routine.completed
            }
          : routine
      )
    );
  };

  const clearCompleted = () => {
    setRoutines((current) => current.filter((routine) => !routine.completed));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Day to Day Routines</Text>
        <Text style={styles.subtitle}>Stay consistent with your healthy habits.</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today&apos;s Progress</Text>
          <Text style={styles.summaryValue}>
            {completedCount}/{routines.length} done
          </Text>
        </View>

        <View style={styles.addRow}>
          <TextInput
            value={newRoutine}
            onChangeText={setNewRoutine}
            placeholder="Add a routine"
            placeholderTextColor="#8291a6"
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={addRoutine}
          />
          <Pressable style={styles.addButton} onPress={addRoutine}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {routines.map((routine) => (
            <Pressable
              key={routine.id}
              style={[styles.routineCard, routine.completed && styles.completedCard]}
              onPress={() => toggleRoutine(routine.id)}
            >
              <View style={[styles.checkbox, routine.completed && styles.checkedCheckbox]}>
                {routine.completed ? <Text style={styles.checkMark}>✓</Text> : null}
              </View>
              <Text style={[styles.routineText, routine.completed && styles.completedText]}>
                {routine.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.clearButton} onPress={clearCompleted}>
          <Text style={styles.clearButtonText}>Clear Completed</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1b2a'
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700'
  },
  subtitle: {
    color: '#b8c4d6',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 14
  },
  summaryCard: {
    backgroundColor: '#1b263b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14
  },
  summaryTitle: {
    color: '#b8c4d6',
    fontSize: 14
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6
  },
  addRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12
  },
  input: {
    flex: 1,
    backgroundColor: '#1b263b',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  addButton: {
    backgroundColor: '#4cc9f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 18
  },
  addButtonText: {
    color: '#0b132b',
    fontWeight: '700'
  },
  list: {
    flex: 1
  },
  listContent: {
    gap: 10,
    paddingBottom: 12
  },
  routineCard: {
    backgroundColor: '#1b263b',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  completedCard: {
    backgroundColor: '#243b55'
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#9fb3c8',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCheckbox: {
    backgroundColor: '#4cc9f0',
    borderColor: '#4cc9f0'
  },
  checkMark: {
    color: '#0b132b',
    fontWeight: '700'
  },
  routineText: {
    color: '#ffffff',
    fontSize: 16,
    flexShrink: 1
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#b8c4d6'
  },
  clearButton: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9fb3c8',
    paddingVertical: 12,
    alignItems: 'center'
  },
  clearButtonText: {
    color: '#dce5f2',
    fontWeight: '600'
  }
});
