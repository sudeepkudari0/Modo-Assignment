# Backend 
# Dashboard for controlling Luxone Miniserver
## Hosted the backend part to cloud(aws ec2), no need of implementing backend part

## Basics
- The base URL for communicationg with luxone miniserver is https://{miniserver_ip}/dev/sps/io/Vti/{?}
- Using this URl i have made a server which acts like miniserver i.e on post request to that endpoint , it responds with certain value.
- To make it realistic , added the setTimeout function to response.


