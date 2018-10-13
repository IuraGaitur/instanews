class ValidationUtil {
    public static isValidUrl = (text: string) => {
        try {
            return Boolean(new URL(text));
        }
        catch(e){
            alert("Please enter a valid URL");
            return false;
        }
    }
}

export default ValidationUtil;