import { useEffect, useState } from "react";
import {
  Alert,
  GestureResponderEvent,
  LayoutRectangle,
  Text,
  View,
} from "react-native";

import { styles } from "./styles";

import { IGameData, IMovement, IOldData } from "./models";
import { Header } from "../../components";
import { cardColors } from "./constants";

export const Game = () => {
  const [gameGridSize, setGameGridSize] = useState(4);

  const [cardSize, setCardSize] = useState<LayoutRectangle>();

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
          item === 0 && validPositionsList.push([rowIndex, columnIndex]),
      ),
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
    let data = Array(gameGridSize)
      .fill(0)
      .map(() =>
        Array(gameGridSize)
          .fill(0)
          .map(() => 0),
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

          while (newRow.length < gameGridSize) {
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

          while (newRow.length < gameGridSize) {
            newRow.unshift({ data: 0, itAdded: false });
          }

          return newRow.map((item) => item.data);
        });

        break;
      }
      case "up": {
        const newColumns: number[][] = Array(gameGridSize)
          .fill(0)
          .map(() => Array(gameGridSize).fill(0));

        for (let i = 0; i < gameGridSize; i++) {
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

          while (newColumn.length < gameGridSize) {
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
        const newColumns: number[][] = Array(gameGridSize)
          .fill(0)
          .map(() => Array(gameGridSize).fill(0));

        for (let i = 0; i < gameGridSize; i++) {
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

          while (newColumn.length < gameGridSize) {
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
        ],
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
      <Header
        moves={movementCount}
        score={score}
        onBack={() => {
          if (oldData === undefined) {
            Alert.alert("Ação inválida", "Não há jogadas anteriores");
          } else if (
            JSON.stringify(oldData.data) === JSON.stringify(gameData)
          ) {
            Alert.alert(
              "Ação inválida",
              "Não é permitido voltar mais de uma jogada",
            );
          } else {
            setGameData(oldData.data);
            setScore(oldData.score);
            setMovementCount((oldValue) => oldValue - 1);
          }
        }}
        onReset={resetGame}
        onMenu={() => Alert.alert("Menu", "Em desenvolvimento")}
      />

      <View
        style={{ flex: 1 }}
        onTouchStart={(event) =>
          setTouchStart({
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
          })
        }
        onTouchMove={handleMovement}
        onTouchEnd={() => setMovement("")}
      >
        <View style={styles.cardContainer}>
          {Array(gameGridSize)
            .fill(0)
            .map((_, rowIndex) => (
              <View key={`background-row-${rowIndex}`} style={styles.cardRow}>
                {Array(gameGridSize)
                  .fill(0)
                  .map((_, index) => (
                    <View
                      onLayout={(event) => {
                        if (rowIndex === 0 && index === 0) {
                          setCardSize(event.nativeEvent.layout);
                        }
                      }}
                      key={`background-column-${index}`}
                      style={styles.cardItem}
                    />
                  ))}
              </View>
            ))}

          {gameData.map((row, rowIndex) =>
            row.map((data, columnIndex) => {
              return data !== 0 ? (
                <View
                  key={`column-item-${rowIndex}-${columnIndex}`}
                  style={[
                    styles.cardItem,
                    {
                      position: "absolute",
                      zIndex: 1,
                      width: cardSize?.width,
                      height: cardSize?.height,
                      backgroundColor:
                        cardColors.find((color) => color.value === data)
                          ?.color || cardColors.at(-1)?.color,
                      transform: [
                        {
                          translateX:
                            (cardSize?.width || 0) * columnIndex +
                            8 * columnIndex +
                            12,
                        },
                        {
                          translateY:
                            (cardSize?.height || 0) * rowIndex +
                            8 * rowIndex +
                            12,
                        },
                      ],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.cardValue,
                      {
                        fontSize:
                          gameGridSize > 4
                            ? String(data).length > 4
                              ? 12
                              : String(data).length > 3
                                ? 18
                                : 24
                            : String(data).length > 4
                              ? 18
                              : String(data).length > 3
                                ? 28
                                : 32,
                      },
                    ]}
                  >
                    {data !== 0 ? data : null}
                  </Text>
                </View>
              ) : null;
            }),
          )}
        </View>
      </View>
    </View>
  );
};
