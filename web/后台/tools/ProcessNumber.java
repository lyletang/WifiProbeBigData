/**
 * 
 * 该类用于处理10以下的数字转换为2位数字符串
 * @author Victors
 * 
 */
package com.victors.tools;

public class ProcessNumber {
	/**
	 * 
	 * 该方法用于处理10以下的数字
	 * @param number
	 * @return String
	 * 
	 */
    public static String processNumber(int number)
    {
    	if(number < 10)
		{
			return "0" + number + "";
		}
		else
		{
			return number + "";
		}
    }
}
