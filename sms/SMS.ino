/*基于arduino mega的多串口实现树莓派WIFI探针的短信控制服务
串口1和sim800通信,
USB串口和Raspberry主机通信,
sim卡一旦接到内容为"开机"或者"boot"的短信时，arduino向串口2发送信息"1",
一旦接受到内容为"关机"或者"shutdown"的短信时，arduino向串口2发送信息"2",
一旦接受到内容为"重启"或者"reboot"的短信时，arduino向串口2发送信息"3",
同时，arduino还一直等待接收着USB串口的信息，接收到不同的信息,分别向户主发送不同的通知.

Author: Jiahui Tang
Date: 2017-5-19
*/

#include <TimerOne.h>

#define DebugSerial Serial2 	//调试信息输出的串口
#define GprsSerail Serial1	//使用mega2560板子可以用Serial1，不用SoftSerial调试，这样更稳定

#define LinuxSerial Serial	//Linux使用的串口

#define Success 1U
#define Failure 0U

int L = 13; //LED指示灯引脚

unsigned long  Time_Cont = 0;       //定时器计数器

const unsigned int gprsRxBufferLength = 100;	//gprs缓存大小
char gprsRxBuffer[gprsRxBufferLength];			//gprs数据存储数组
unsigned int gprsBufferCount = 0;				//gprs缓存数组指针

char messageBuffer[100] = {};		//短信缓存数组

char phoneNumber[] = "13596090059";		//替换成需要被拨打电话的号码
char msg1[] = "OK! Boot successfully!";		//短信内容1
char msg2[] = "Boot failure! The WIFI probe has been turned on!";		//短信内容2
char msg3[] = "OK! Shutdown successfully!";		//短信内容3
char msg4[] = "Shutdown failure! The WIFI probe has been turned off!";		//短信内容4
char msg5[] = "OK! Reboot successfully!";		//短信内容5
char msg6[] = "Reboot failure! The WIFI probe is now in a state of shutdown!";		//短信内容6

char send_buf[20] = {0};		//发送短信缓存数组

void setup() {
	pinMode(L, OUTPUT);			
	digitalWrite(L, HIGH);

	DebugSerial.begin(9600);		//初始化波特率
	GprsSerail.begin(9600);
	LinuxSerial.begin(9600);

	Timer1.initialize(1000);
	Timer1.attachInterrupt(Timer1_handler);		//初始化定时器中断

	initGprs();		//初始化模块

	DebugSerial.println("\r\nsetup end!");
	clrGprsRxBuffer();		//清空GPRS缓存数组
}

void loop() {
	
	if(getMessage() == Success)			//当接收到短信时候进入
	{
		DebugSerial.println("gprsRxBuffer:");
		DebugSerial.println(gprsRxBuffer);
		parseMessage();							//解析短信内容
	
		DebugSerial.println("getMessage:");
		DebugSerial.println(messageBuffer);

		if(strstr(messageBuffer, "reboot") != NULL || strstr(messageBuffer, "91CD542F") != NULL) //91CD 542F //重启
		{
			DebugSerial.println("GET reboot Command!");
			digitalWrite(L, HIGH);
			LinuxSerial.print("3");       //Linux串口打印3
		}

		else if(strstr(messageBuffer, "boot") != NULL || strstr(messageBuffer, "5f00") != NULL) //5f00 673A //开机
		{
			DebugSerial.println("GET BOOT Command!");
			digitalWrite(L, HIGH);
			LinuxSerial.print("1");     //Linux串口打印1
		}		

		else if(strstr(messageBuffer, "shutdown") != NULL || strstr(messageBuffer, "5173673A") != NULL)	//5173 673A //关机
		{
			DebugSerial.println("GET SHUTDOWN Command!");
			digitalWrite(L, LOW);
			LinuxSerial.print("2");				//Linux串口打印2
		}
		
	}
	getLinuxData();				//获取解析linux发送过来的数据

}

void sendMessage(char *number,char *msg)
{
	memset(send_buf, 0, 20);    //清空
	strcpy(send_buf, "AT+CMGS=\"");
	strcat(send_buf, number);
	strcat(send_buf, "\"\r\n");
	if (sendCommand(send_buf, ">", 3000, 10) == Success);
	else errorLog(7);

	if (sendCommand(msg, msg, 3000, 10) == Success);
	else errorLog(8);

	memset(send_buf, 0, 20);    //清空
	send_buf[0] = 0x1a;
	send_buf[1] = '\0';
	if (sendCommand(send_buf, "OK\r\n", 10000, 5) == Success);
	else errorLog(9);
}

void getLinuxData()
{
	while (LinuxSerial.available())
	{
		char str = LinuxSerial.read();
		if(str == '1')
		{
			DebugSerial.println("GET linux data:1");
			sendMessage(phoneNumber,msg1);		//发送短信
			DebugSerial.println("send message ok!");
		}
		else if(str == '2')
		{
			DebugSerial.println("GET linux data:2");
			sendMessage(phoneNumber,msg2);		//发送短信
			DebugSerial.println("send message ok!");
		}
		else if(str == '3')
		{
			DebugSerial.println("GET linux data:3");
			sendMessage(phoneNumber,msg3);		//发送短信
			DebugSerial.println("send message ok!");
		}
		else if(str == '4')
		{
			DebugSerial.println("GET linux data:4");
			sendMessage(phoneNumber,msg4);		//发送短信
			DebugSerial.println("send message ok!");
		}
		else if(str == '5')
		{
			DebugSerial.println("GET linux data:5");
			sendMessage(phoneNumber,msg5);		//发送短信
			DebugSerial.println("send message ok!");
		}
		else if(str == '6')
		{
			DebugSerial.println("GET linux data:6");
			sendMessage(phoneNumber,msg6);		//发送短信
			DebugSerial.println("send message ok!");
		}
	}
}

void parseMessage()
{
	char *messageHead=NULL;
	char *messageEnd1=NULL;
	char *messageEnd2=NULL;

	memset(messageBuffer, 0, sizeof(messageBuffer)-1); 	//清空短信内容缓冲区
	messageHead = strstr(gprsRxBuffer, "CMT");
	if (messageHead != NULL)
	{
		messageEnd1 = strstr(messageHead, "\n");
		if (messageEnd1 != NULL)
		{
			messageEnd1 ++;
			messageEnd2 = strstr(messageEnd1, "\n");
			if (messageEnd2 != NULL)
			{	
				memcpy(messageBuffer, messageEnd1, messageEnd2 - messageEnd1);
									

			}else DebugSerial.println("messageEnd2 NULL"); 
		}else DebugSerial.println("messageEnd1 NULL"); 

	}else DebugSerial.println("messageHead NULL"); 

	clrGprsRxBuffer();
}


int getMessage() {
	while (GprsSerail.available())
	{
		gprsRxBuffer[gprsBufferCount] = GprsSerail.read();
		if (gprsBufferCount == gprsRxBufferLength)clrGprsRxBuffer();

		DebugSerial.print(gprsRxBuffer[gprsBufferCount]);
		if( gprsRxBuffer[gprsBufferCount] == '+')
		{
			Time_Cont = 0;
			while (Time_Cont < 500)
			{
				while (GprsSerail.available())
				{
					gprsRxBuffer[gprsBufferCount] = (char)GprsSerail.read();
					DebugSerial.print(gprsRxBuffer[gprsBufferCount]);

					gprsBufferCount++;
					if (gprsBufferCount == gprsRxBufferLength)clrGprsRxBuffer();
				}	
			}
			gprsRxBuffer[gprsBufferCount]='\0';	
			return Success;			
		}
	}

	return Failure;
}

void initGprs()
{
	// if (sendCommand("AT+RST\r\n", "OK\r\n", 3000, 10) == Success);
	// else errorLog(1);

	if (sendCommand("AT\r\n", "OK\r\n", 3000, 10) == Success);
	else errorLog(2);

	delay(10);


	if (sendCommand("AT+CMGF=1\r\n", "OK\r\n", 3000, 10) == Success);
	else errorLog(3);
	delay(10);

	if (sendCommand("AT+CSCS=\"GSM\"\r\n", "OK\r\n", 3000, 10) == Success);
	else errorLog(4);
	delay(10);

	if (sendCommand("AT+CNMI=2,2\r\n", "OK\r\n", 3000, 10) == Success);
	else errorLog(5);
	delay(10);

}

void(* resetFunc) (void) = 0; //制造重启命令

void errorLog(int num)
{
	DebugSerial.print("ERROR");
	DebugSerial.println(num);
	while (1)
	{
		digitalWrite(L, HIGH);
		delay(100);
		digitalWrite(L, LOW);
		delay(100);
		digitalWrite(L, HIGH);
		delay(100);
		digitalWrite(L, LOW);
		delay(300);

		if (sendCommand("AT\r\n", "OK", 100, 10) == Success)
		{
			DebugSerial.print("\r\nRESET!!!!!!\r\n");
			resetFunc();
		}
	}
}

unsigned int sendCommand(char *Command, char *Response, unsigned long Timeout, unsigned char Retry)
{
	clrGprsRxBuffer();
	for (unsigned char n = 0; n < Retry; n++)
	{
		DebugSerial.print("\r\n---------send AT Command:---------\r\n");
		DebugSerial.print(Command);

		GprsSerail.print(Command);

		Time_Cont = 0;
		while (Time_Cont < Timeout)
		{
			gprsReadBuffer();
			if (strstr(gprsRxBuffer, Response) != NULL)
			{
				DebugSerial.print("\r\n==========receive AT Command:==========\r\n");
				DebugSerial.print(gprsRxBuffer); //输出接收到的信息
				clrGprsRxBuffer();
				return Success;
			}
		}
		Time_Cont = 0;
	}
	DebugSerial.print("\r\n==========receive AT Command:==========\r\n");
	DebugSerial.print(gprsRxBuffer);//输出接收到的信息
	// clrGprsRxBuffer();
	return Failure;
}

unsigned int sendCommandReceive2Keyword(char *Command, char *Response, char *Response2, unsigned long Timeout, unsigned char Retry)
{
	clrGprsRxBuffer();
	for (unsigned char n = 0; n < Retry; n++)
	{
		DebugSerial.print("\r\n---------send AT Command:---------\r\n");
		DebugSerial.print(Command);

		GprsSerail.print(Command);

		Time_Cont = 0;
		while (Time_Cont < Timeout)
		{
			gprsReadBuffer();
			if (strstr(gprsRxBuffer, Response) != NULL && strstr(gprsRxBuffer, Response2) != NULL)
			{
				DebugSerial.print("\r\n==========receive AT Command:==========\r\n");
				DebugSerial.print(gprsRxBuffer); //输出接收到的信息
				clrGprsRxBuffer();
				return Success;
			}
		}
		Time_Cont = 0;
	}
	DebugSerial.print("\r\n==========receive AT Command:==========\r\n");
	DebugSerial.print(gprsRxBuffer);//输出接收到的信息
	clrGprsRxBuffer();
	return Failure;
}



void Timer1_handler(void)
{
	Time_Cont++;
}



void gprsReadBuffer() {
	while (GprsSerail.available())
	{
		gprsRxBuffer[gprsBufferCount++] = GprsSerail.read();
		if (gprsBufferCount == gprsRxBufferLength)clrGprsRxBuffer();
	}
}

void clrGprsRxBuffer(void)
{
	memset(gprsRxBuffer, 0, gprsRxBufferLength);      //清空
	gprsBufferCount = 0;
}
