describe('Sudoku', function() {
 var sudoku;

  beforeEach(function() {
    sudoku = new Sudoku();
  });

  describe('Setting up checks that', function() {
    it('there are default number of validation rows', function() {
      expect(sudoku.validationArrays.row.length).toEqual(sudoku.defaultGridSize);
    });

    it('each validation row has default number of entries', function() {
      expect(sudoku.validationArrays.row[0].length).toEqual(sudoku.defaultGridSize);
    });

    it('there are default number of validation columns', function() {
      expect(sudoku.validationArrays.col.length).toEqual(sudoku.defaultGridSize);
    });

    it('each validation column has default number of entries', function() {
      expect(sudoku.validationArrays.col[0].length).toEqual(sudoku.defaultGridSize);
    });

    it('there are default number of validation sections', function() {
      expect(sudoku.validationArrays.sect.length).toEqual(sudoku.defaultGridSize);
    });
  });

  describe('Validation', function() {
    it('can insert numbers into the validation row arrays', function() {
      sudoku.insert(1, 0, 2);
      expect(sudoku.validationArrays.row[1][0]).toEqual(2);
    });

    it('can insert numbers into the validation col arrays', function() {
      sudoku.insert(1, 0, 2);
      expect(sudoku.validationArrays.col[0][1]).toEqual(2);
    });

    it('can insert numbers into the validation sect arrays', function() {
      sudoku.insert(1, 0, 2);
      sudoku.insert(1, 1, 3);
      expect(sudoku.validationArrays.sect[0]).toEqual([2, 3]);
    });

    it('returns true if the array is unqiue', function() {
      expect(isArrayUnique([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
    });

    it('returns false if the array is not unqiue', function() {
      expect(isArrayUnique([1, 2, 3, 4, 5, 6, 7, 8, 1])).toBe(false);
    });

    it('returns false if the array contains non digits', function() {
      expect(isArrayUnique([1, 2, 3, 4, 5, 6, 7, 8, 'a'])).toBe(false);
    });

    describe('checking all rows and columns, scenario 1', function() {
      beforeEach(function(){
        for (i = 0; i < sudoku.defaultGridSize; i++) {
          for (j = 0; j < sudoku.defaultGridSize; j++) {
            sudoku.insert(i, j, 1);
          }
        }
      });

      it('returns false if all the rows are not unique', function() {
        expect(sudoku.areRowsUnique()).toBe(false);
      });

      it('returns false if all the columns are not unique', function() {
        expect(sudoku.areColsUnique()).toBe(false);
      });

      it('returns false if all the sectionss are not unique', function() {
        expect(sudoku.areSectsUnique()).toBe(false);
      });

      it('returns false if not all rows, columns and sections are unique', function() {
        expect(sudoku.isGameFinished()).toBe(false);
      });
    });

    describe('checking all rows and columns, scenario 2', function() {
      beforeEach(function(){
        var calculateEveryThirdRow = function(i, j) {
          return ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1) % sudoku.defaultGridSize);
        };

        var calculateOtherRows = function(i, j) {
          return ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize) === 0 ? 9 : ((Math.floor(i / 3) + j + 1 + 3 * (i % 3)) % sudoku.defaultGridSize);
        };

        for (i = 0; i < sudoku.defaultGridSize; i++) {
          for (j = 0; j < sudoku.defaultGridSize; j++) {
            if (i % 3 === 0) {
              sudoku.insert(i, j, calculateEveryThirdRow(i, j));
            } else {
              sudoku.insert(i, j, calculateOtherRows(i, j));
            }
          }
        }
      });

      it('returns true if all the rows are unique', function() {
        expect(sudoku.areRowsUnique()).toBe(true);
      });

      it('returns true if all the columns are unique', function() {
        expect(sudoku.areColsUnique()).toBe(true);
      });

      it('returns true if all the sections are unique', function() {
        expect(sudoku.areColsUnique()).toBe(true);
      });

      it('returns true if all rows, columns and sections are unique', function() {
        expect(sudoku.isGameFinished()).toBe(true);
      });
    });
  });
});
