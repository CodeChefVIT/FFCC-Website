''' FFCC algorithm for finding time table with least number of gaps'''

dict_theory = {

     'A1': [1, 14],           'A2': [31, 38],
     'B1': [7, 20],           'B2': [37, 50],
     'C1': [13, 26],          'C2': [43, 56],
     'D1': [3,19],            'D2': [49, 33],
     'E1': [9, 25],           'E2': [39,55],
     'F1': [2, 15],           'F2': [32,45],
     'G1': [8, 21],           'G2': [38, 51],
    'TA1': [27],             'TA2': [57],
    'TB1': [4],              'TB2': [34],
    'TC1': [10],             'TC2': [40],
    'TD1': [29],             'TD2': [46],
    'TE1': [22],             'TE2': [52],
    'TF1': [28],             'TF2': [58],
    'TG1': [5],              'TG2': [35],
   'TAA1': [11],            'TAA2': [41],
   'TCC1': [23],            'TBB2': [47],
     'V1': [16],            'TCC2': [53],
     'V2': [17],            'TDD2': [59],
                              'V3': [36], 'V4': [42], 'V5': [48],
                              'V6': [54], 'V7': [60]
}

dict_lab = {}
for i in range(1, 61):
    dict_lab[i] = 0

'''Initial LAB Dictionary, display re-arranged for simplified explanation

{      1: 0,  2: 0,  3: 0,  4: 0,  5: 0,  6: 0,               31: 0, 32: 0, 33: 0, 34: 0, 35: 0, 36: 0,
       7: 0,  8: 0,  9: 0, 10: 0, 11: 0, 12: 0,               37: 0, 38: 0, 39: 0, 40: 0, 41: 0, 42: 0,
      13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0,               43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0,
      19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,               49: 0, 50: 0, 51: 0, 52: 0, 53: 0, 54: 0,
      25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0,               55: 0, 56: 0, 57: 0, 58: 0, 59: 0, 60: 0
}'''



# Below function counts number of gaps





def gap_counter(dict_lab):

    count_gap = False    # Gaps counted only when this is true

    reference = 0       # 'reference' will be explained below

    gaps = 0             # Stores the gaps in the current table. Proper explanation see further below

    for i in range(1, 61):

        if (count_gap is False) and (dict_lab[i] == 1):     # This prevents counting free slots in the beginning as gaps
            count_gap = True                                # eg: if class is from 10am, it won't count 8 am and 9am free slots as a gap

        if count_gap is True:
            if (dict_lab[i] == 0):      # This counts the gaps
                gaps += 1
                reference += 1          # This works same as 'gaps' here, difference is further down
                '''print('GAP is ' + str(i))'''

        if dict_lab[i] == 1:
            reference = 0               # If filled slot is encountered, this resets.


        if i%6 is 0:                              # After every 6th iteration, 'count gap' is set to False. See Sample dictionary.
                                                  # 6th iteration because if there is free slot right after that, it should not be a counted as gap
            count_gap = False
            gaps -= reference                     # This subtracts the extra gaps that were added at the end
            '''print(gaps)'''

    return gaps





test = []
def print1(arr):
    # number of arrays
    n = len(arr)
    temp = []
    indices = [0 for i in range(n)]

    while (1):

        # prcurrent combination
        for i in range(n):
            temp.append(arr[i][indices[i]])
        test.append((temp))
        temp = []
        print()

        next = n - 1
        while (next >= 0 and
               (indices[next] + 1 >= len(arr[next]))):
            next -= 1

        if (next < 0):
            return

        indices[next] += 1

        for i in range(next + 1, n):
            indices[i] = 0




def tableCreator(total_gap):

    arr = [[] for i in range(11)]

    # now entering data
    # [[slots of subject 1], [slots of subject 2], [slots of subject 3]]

    arr[0].append(['B2', 'TB2'])
    arr[0].append(['B1', 'TB1'])
    arr[1].append(['35','36','43','44','57','58'])
    arr[2].append(['A1'])
    arr[3].append(['51','52'])
    arr[4].append(['33','34','47','48'])
    arr[5].append(['C1'])
    arr[6].append(['G1','TG1'])
    arr[7].append(['45','46'])
    arr[8].append(['E1', 'TE1'])
    arr[9].append(['39', '40'])
    arr[10].append(('F1', 'TF1'))

    print1(arr)

    # print(test)
    print(test[0])

    for i in range(len(test)):
        test_case = test[i]
        # print(test_case)
        break_condition = False

        # Each test case (table) loop
        for j in range(len(test_case)):

            if break_condition == True:
                for i in range(1, 61):
                    dict_lab[i] = 0
                print('Clash')
                break_condition = False
                break



            #Storing into dictionary

            for k in range(len(test_case[j])):
                if break_condition == True:
                    break

                #print(test_case[j][k])
                address = test_case[j][k]

                # lab slots
                if address.isdigit():
                    #print(address)
                    address = int(address)
                    if dict_lab[address] == 0:
                        dict_lab[address] = 1
                    else:
                        break_condition = True
                        break



                # Theory
                else:
                    #print(address)
                    temp = dict_theory[address]
                    #print(temp)
                    if break_condition == True:
                        break

                    for m in range(len(temp)):
                        if dict_lab[temp[m]] == 0:
                            dict_lab[temp[m]] = 1
                        else:
                            break_condition = True
                            break

        print(dict_lab)
        print()
        gap = gap_counter(dict_lab)
        if dict_checker(dict_lab) == True:
            print('Number of gaps: ' + str(gap))
            if gap < total_gap:
                total_gap = gap



def dict_checker(dict_lab):

    for i in range(1,61):
        if dict_lab[i] == 1:
            return True
        else:
            return False



total_gap = 60        # Stores the minimum number of gaps across all tables
tableCreator(total_gap)
