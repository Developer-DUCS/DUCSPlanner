import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

const PlanCreation = (props) => {
  const itemsFromBackend = [];

  let listItems = [];

  let classes = localStorage.getItem("fetchCourseList");

  let classList = classes.split(";");
  console.log(classList);
  classList.pop();

  for (let j = 0; j < classList.length; j++) {
    itemsFromBackend.push(JSON.parse(classList[j]));
  }

  const columnsFromBackend =
  {
    [uuid()]: {
      name: 'Class List',
      items: itemsFromBackend
    },
    [uuid()]: {
      name: 'Semester 1',
      items: []
    },
    [uuid()]: {
      name: 'Semester 2',
      items: []
    }/* ,
        [uuid()]: {
            name: 'Semester 3',
            items: []
        },
        [uuid()]: {
            name: 'Semester 4',
            items: []
        },
        [uuid()]: {
            name: 'Semester 5',
            items: []
        },
        [uuid()]: {
            name: 'Semester 6',
            items: []
        },
        [uuid()]: {
            name: 'Semester 7',
            items: []
        },
        [uuid()]: {
            name: 'Semester 8',
            items: []
        } */
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const returnContent = () => {
    console.log(listItems);
    let listPrint = "[ ";
    for (let i = 0; i < listItems.length; i++) {
      listPrint = listPrint + "[ ";
      for (let k = 0; k < listItems[i].length; k++) {
        //console.log(listItems[i][k].content);
        listPrint = listPrint + listItems[i][k].CoursePrefix + " " + listItems[i][k].CourseCode + " ";
      }
      listPrint = listPrint + "] ";
    }
    listPrint = listPrint + "]";
    console.log(listPrint);
  };

  return (
    <View style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'left', height: '95%' }}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            listItems.push(column.items);
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={id}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', background: 'lightgrey', width: 258 }}>
                  <h2 style={{ background: 'lightgrey' }}>{column.name}</h2>
                </div>
                <div style={{ marginBottom: 8, marginRight: 8, marginLeft: 8, border: 40, borderColor: 'black' }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable key={item.CoursePrefix + " " + item.CourseCode} draggableId={item.CoursePrefix + " " + item.CourseCode} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.CoursePrefix+ " "+ item.CourseCode+" "+item.CourseName + " " + item.Semester + " " + item.CreditHours +" Credit Hours"}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
      {returnContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlanCreation;