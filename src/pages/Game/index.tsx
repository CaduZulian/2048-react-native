import { useEffect, useState } from "react";
import { Alert, GestureResponderEvent, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { styles } from "./styles";

import { IGameData, IMovement, IOldData } from "./models";

export const Game = () => {
  const count = 4;

  const [oldData, setOldData] = useState<IOldData | undefined>();

  const [isUserWin, setIsUserWin] = useState(false);

  const [score, setScore] = useState(0);
  const [movement, setMovement] = useState<IMovement>("");
  const [movementCount, setMovementCount] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const generateRandomNumber = (data: IGameData) => {
    const validPositionsList: number[][] = [];

    data.forEach((row, rowIndex) =>
      row.forEach(
        (item, columnIndex) =>
          item === 0 && validPositionsList.push([rowIndex, columnIndex])
      )
    );

    return {
      value: Math.random() >= 0.9 ? 4 : 2,
      position:
        validPositionsList[
          Math.floor(Math.random() * validPositionsList.length)
        ],
    };
  };

  const generateDefaultData = () => {
    let data = Array(count)
      .fill(0)
      .map(() =>
        Array(count)
          .fill(0)
          .map(() => 0)
      );

    const firstNumber = generateRandomNumber(data);

    data[firstNumber.position[0]][firstNumber.position[1]] = firstNumber.value;

    const secondNumber = generateRandomNumber(data);

    data[secondNumber.position[0]][secondNumber.position[1]] =
      secondNumber.value;

    return data;
  };

  const [gameData, setGameData] = useState<IGameData>(generateDefaultData);

  const handleMovement = (event: GestureResponderEvent) => {
    if (movement !== "") return;

    const x = event.nativeEvent.pageX;
    const y = event.nativeEvent.pageY;

    const diffX = touchStart.x - x;
    const diffY = touchStart.y - y;

    if (Math.abs(diffX) < 100 && Math.abs(diffY) < 100) return;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setMovement("left");
      } else {
        setMovement("right");
      }
    } else {
      if (diffY > 0) {
        setMovement("up");
      } else {
        setMovement("down");
      }
    }
  };

  const move = (direction: IMovement) => {
    const oldScore = score;

    let data = gameData;

    switch (direction) {
      case "left": {
        data = data.map((row) => {
          const newRow: { data: number; itAdded: boolean }[] = [];

          row.forEach((item) => {
            if (item !== 0) {
              if (newRow.length === 0) {
                newRow.push({ data: item, itAdded: false });
              } else {
                if (
                  newRow[newRow.length - 1].data === item &&
                  !newRow[newRow.length - 1].itAdded
                ) {
                  newRow[newRow.length - 1] = { data: item * 2, itAdded: true };
                  setScore((oldValue) => oldValue + item * 2);
                } else {
                  newRow.push({ data: item, itAdded: false });
                }
              }
            }
          });

          while (newRow.length < count) {
            newRow.push({ data: 0, itAdded: false });
          }

          return newRow.map((item) => item.data);
        });

        break;
      }
      case "right": {
        data = data.map((row) => {
          const newRow: { data: number; itAdded: boolean }[] = [];

          new Array(...row).reverse().forEach((item) => {
            if (item !== 0) {
              if (newRow.length === 0) {
                newRow.unshift({ data: item, itAdded: false });
              } else {
                if (newRow[0].data === item && !newRow[0].itAdded) {
                  newRow[0] = { data: item * 2, itAdded: true };
                  setScore((oldValue) => oldValue + item * 2);
                } else {
                  newRow.unshift({ data: item, itAdded: false });
                }
              }
            }
          });

          while (newRow.length < count) {
            newRow.unshift({ data: 0, itAdded: false });
          }

          return newRow.map((item) => item.data);
        });

        break;
      }
      case "up": {
        const newColumns: number[][] = Array(count)
          .fill(0)
          .map(() => Array(count).fill(0));

        for (let i = 0; i < count; i++) {
          const column = data.map((row) => row[i]);

          const newColumn: { data: number; itAdded: boolean }[] = [];

          column.forEach((item) => {
            if (item !== 0) {
              if (newColumn.length === 0) {
                newColumn.push({ data: item, itAdded: false });
              } else {
                if (
                  newColumn[newColumn.length - 1].data === item &&
                  !newColumn[newColumn.length - 1].itAdded
                ) {
                  newColumn[newColumn.length - 1] = {
                    data: item * 2,
                    itAdded: true,
                  };
                  setScore((oldValue) => oldValue + item * 2);
                } else {
                  newColumn.push({ data: item, itAdded: false });
                }
              }
            }
          });

          while (newColumn.length < count) {
            newColumn.push({ data: 0, itAdded: false });
          }

          newColumn.forEach((item, index) => {
            newColumns[index][i] = item.data;
          });
        }

        data = newColumns;

        break;
      }

      case "down": {
        const newColumns: number[][] = Array(count)
          .fill(0)
          .map(() => Array(count).fill(0));

        for (let i = 0; i < count; i++) {
          const column = data.map((row) => row[i]);

          const newColumn: { data: number; itAdded: boolean }[] = [];

          new Array(...column).reverse().forEach((item) => {
            if (item !== 0) {
              if (newColumn.length === 0) {
                newColumn.unshift({ data: item, itAdded: false });
              } else {
                if (newColumn[0].data === item && !newColumn[0].itAdded) {
                  newColumn[0] = { data: item * 2, itAdded: true };
                  setScore((oldValue) => oldValue + item * 2);
                } else {
                  newColumn.unshift({ data: item, itAdded: false });
                }
              }
            }
          });

          while (newColumn.length < count) {
            newColumn.unshift({ data: 0, itAdded: false });
          }

          newColumn.forEach((item, index) => {
            newColumns[index][i] = item.data;
          });
        }

        data = newColumns;

        break;
      }
    }

    if (JSON.stringify(data) !== JSON.stringify(gameData)) {
      const newNumber = generateRandomNumber(data);

      data[newNumber.position[0]][newNumber.position[1]] = newNumber.value;

      setOldData({ data: gameData, score: oldScore });
      setMovementCount((oldValue) => oldValue + 1);
      setGameData(data);
    }
  };

  const resetGame = () => {
    if (score !== 0) {
      Alert.alert(
        "Reiniciar jogo",
        "Você tem certeza que deseja reiniciar o jogo?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Reiniciar",
            onPress: () => {
              setGameData(generateDefaultData());
              setOldData(undefined);
              setMovementCount(0);
              setIsUserWin(false);
              setScore(0);
            },
          },
        ]
      );
    } else {
      setGameData(generateDefaultData());
      setOldData(undefined);
      setMovementCount(0);
      setIsUserWin(false);
      setScore(0);
    }
  };

  useEffect(() => {
    if (movement) {
      move(movement);
    } else {
      setTouchStart({ x: 0, y: 0 });
    }
  }, [movement]);

  useEffect(() => {
    if (gameData.flat().includes(2048) && !isUserWin) {
      Alert.alert("Parabéns, Você venceu o jogo!", "Deseja reiniciar o jogo?", [
        {
          text: "Reiniciar",
          onPress: resetGame,
        },
        {
          text: "Continuar",
          onPress: () => setIsUserWin(true),
        },
      ]);
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <View style={styles.hudContainer}>
        <View style={styles.hudItem}>
          <Text style={styles.hudItemLabel}>Movimentos</Text>
          <Text style={styles.hudItemValue}>{movementCount}</Text>
        </View>

        <View style={styles.hudItem}>
          <Text style={styles.hudItemLabel}>Pontos</Text>
          <Text style={styles.hudItemValue}>{score}</Text>
        </View>

        <MaterialCommunityIcons
          name="arrow-left-top"
          size={40}
          color="white"
          onPress={() => {
            if (oldData === undefined) {
              Alert.alert("Ação inválida", "Não há jogadas anteriores");
            } else if (
              JSON.stringify(oldData.data) === JSON.stringify(gameData)
            ) {
              Alert.alert(
                "Ação inválida",
                "Não é permitido voltar mais de uma jogada"
              );
            } else {
              setGameData(oldData.data);
              setScore(oldData.score);
              setMovementCount((oldValue) => oldValue - 1);
            }
          }}
        />

        <MaterialCommunityIcons
          name="reload"
          size={40}
          color="white"
          onPress={resetGame}
        />
      </View>

      <View
        style={styles.cardContainer}
        onTouchStart={(event) =>
          setTouchStart({
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          })
        }
        onTouchMove={handleMovement}
        onTouchEnd={() => setMovement("")}
      >
        {gameData.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.cardRow}>
            {row.map((data, columnIndex) => (
              <View
                key={`column-item-${rowIndex}-${columnIndex}`}
                style={styles.cardItem}
              >
                <Text style={styles.cardValue}>{data !== 0 ? data : null}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
