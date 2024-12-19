# This is a full-stack application developed with Spring Boot as the backend and React as the front end, integrated with Kafka and Zookeeper for event-driven architecture.

## Key Features:

### Backend (Spring Boot):
 * RESTful API to manage employee data.
 * Scheduled task to update employee timestamps at regular intervals.
 * Integrated with Kafka to publish employee data updates.
   
### Frontend (React):
 * User interface to display and manage employee data.
 * Fetches data from the backend and displays it dynamically.
 * Provides the ability to view employee details in a table format.
   
### Kafka:
**Producer:** Sends employee data from the backend to Kafka for further processing or event-driven communication.
**Consumer:** To be implemented, processes incoming events and takes action based on received data.

### Zookeeper:
  * Manages Kafka brokers and coordinates distributed systems for scalability and fault tolerance.

# How To Run The Application:

1. Start the zoo keeper.
   
	a. go to path C:\kafka and open command prompt from there.
	b. give the command  .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
	
2. Start the kafka.
   
	a. go to path C:\kafka and open command prompt from there.
	b. give the command  .\bin\windows\kafka-server-start.bat .\config\server.properties

3. Run backend service
   
	a. Open Spring tool suite (STS) and run the application

4. Create a kafka topic employee-topic if not created already
   
	a. go to path C:\kafka and open command prompt from there.

	b. give the command  .\bin\windows\kafka-topics.bat --create --topic employee-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

	c. verify the topic with below command,
		.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092

5. Run frontend application
   
	a. Navigate to your project directory,
		cd C:\Users\krishna\visualstudio-workspace\employee-ui

	b. give command 
		npm start

	c. Open the below URL in browser
		http://localhost:3000
		
6. Test Kafka and backend
   
	a. Test backend with postman with below data and with URL: _http://localhost:8080/employees/publish_

    {
			"name": "Testername 1",
			"email": "tester1@example.com",
			"salary": 50000
		}

	This triggers the backend to consume the Kafka message and store it in the H2 database.
	
	b. Verify the database:
	
		Go to the H2 console at http://localhost:8080/h2-console.
		Use the credentials defined in application.properties (jdbc:h2:mem:employeedb, user: sa).
		Run: SQL query  SELECT * FROM employee;
		
8. Test the frontend
   
	a. Open the React UI at http://localhost:3000.

	b. Verify:
		Employee data is displayed in a paginated table.
		Search functionality works as expected.
		Pagination allows you to navigate between pages.
		
9. Test Scheduled Updates

	a. Wait for given time for the scheduled service to update the timestamp field in the database.
 
	b. Refresh the H2 database query: SELECT * FROM employee;
 
	c. Verify that the timestamp field is updated.
 
	d. Refresh the React frontend and confirm the updated data is displayed.

10. Debugging and Logs
    
	a. Backend Logs: Check Spring Boot console logs for errors or Kafka consumer activity.

	b. Kafka Logs: Check Kafka terminal logs for message production/consumption.

	c. Frontend Console: Use browser developer tools (F12) to check for React errors.
