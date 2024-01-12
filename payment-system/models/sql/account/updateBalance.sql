UPDATE Payment_Accounts 
SET remaining_balance = remaining_balance + $2
WHERE id = $1