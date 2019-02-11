import sqlite3

def generate_uuid():
	return "uuid"

def registerUser(deets,secure,salt):
	uuid=generate_uuid()
	query = "insert into users(first_name, last_name,email,uuid,pass,salt) values ('%s','%s','%s','%s','%s','%s');" %(
		deets['X-User-First'],deets['X-User-Last'],deets['X-User-Email'],uuid,secure,salt
	)
	print(query)
	#return uuid

def getUser(n,p):
	conn = sqlite3.connect('secretsanta.db')
	cursor = conn.execute("SELECT * from users")

	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	data = []
	for row in rows:
		print(row)
		#entry = {}
		#for prop, val in zip(cols, row):
		#entry[prop] = val
		#data.append(entry)

	print ("Operation done successfully");
	conn.close()

	#return data

def getGroups(p):
	data =groups
	print ("Operation done successfully")
	return data

def addGroup(groupName):
	for group in groups:
		if groupName == groups[group]["name"]:
			return False
	return True

def putOne(name,datetime,msg):
	conn = sqlite3.connect('birdy.db')
	c = conn.cursor()
	c.execute("INSERT INTO chirps (user, datetime, msg) VALUES(?,?,?)", (name,datetime,msg))
	#num = c.execute("SELECT id FROM clients ORDER BY id DESC LIMIT 1")
	conn.commit()
	#rows = [x for x in num]
	#print ("Operation done successfully "+str(rows[0][0]));
	c.close()
	conn.close()
	return


groups= {
		"id0001": {
			"name":"group1",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0002": {
			"name":"group2",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0003": {
			"name":"group3",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0004": {
			"name":"group4",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0005": {
			"name":"group5",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0006": {
			"name":"group6",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0007": {
			"name":"group7",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		}
	}