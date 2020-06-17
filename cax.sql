
SELECT
	fil.`Blob_Name`,
    fil.`TST_Reference_Number`,
    fil.`Segment_Line_Number`,
    fil.`Segment_Reference_Number`,
    fil.`Product_Reference_Number`,
    fil.`Coupon_Order`,
    
    fil.`Previous_Coupon_Status`,
    fil.`Coupon_Status`,
    fil.`Transaction_Type`,
    `Departure_Date`,
     
    fil.`Ticket_Number`,
    raw.`allAvailableTicket`,
    fil.`Old_Ticket_Number`,
    
	IF(DATEDIFF(CURDATE(), sf.`Booking_Date`) < 366
       ,(CASE
         	WHEN (sf.`Previous_Coupon_Status` = 'I' AND sf.`Coupon_Status` IN ('B', 'BD', 'CK', 'E'))
         		 AND (raw.`allAvailableTicket` LIKE CONCAT('%',sf.`Old_Ticket_Number`, '%'))
         		 AND sf.`Old_Ticket_Number` <> '' THEN 'REDEEMED'
         	WHEN sf.`Previous_Coupon_Status` = 'I' AND sf.`Coupon_Status` = 'RF' OR sf.`Transaction_Type` = 'REFUNDED' THEN 'REFUNDED'         
         	WHEN sf.`Coupon_Status` = 'I' AND DATEDIFF(CURDATE(), sf.`Departure_Date`) > 0 THEN 'AVAILABLE'
         	ELSE ''
       	END)       
       , IF (sf.`Coupon_Status` IN ('I', 'S'), 'LOST', '')) AS 'Stored Credit Status'
FROM `trans_stored_credit_filtered` AS sf 
	
    LEFT JOIN (SELECT 
               pre1.`PNR` 
               ,GROUP_CONCAT(pre1.`TicketNumber`) AS allAvailableTicket
               FROM (SELECT `PNR`, `TicketNumber` 
                     FROM `dev_qbt_xml_coupon_raw_data_with_available_status` 
                     GROUP BY `PNR`, `TicketNumber`) AS pre1
               GROUP BY
               pre1.`PNR`) AS raw 
    ON raw.`PNR` = sf.`PNR`

-- GROUP BY `Blob_Name`, `TST_Reference_Number`, `Segment_Line_Number`, `Segment_Reference_Number`, `Ticket_Number`, `Coupon_Order` HAVING COUNT(*) > 1



/*
SELECT 
	pre1.`PNR`
    ,GROUP_CONCAT(pre1.`TicketNumber`) AS ticketNumberConcat
FROM (SELECT `PNR`, `TicketNumber` 
      FROM `dev_qbt_xml_coupon_raw_data_with_available_status` 
      GROUP BY `PNR`, `TicketNumber`) AS pre1
GROUP BY
	pre1.`PNR`
    */
       
          
          
          
          
          
          
          
          
          
          
	