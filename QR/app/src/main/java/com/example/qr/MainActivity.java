package com.example.qr;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.widget.Button;

import com.journeyapps.barcodescanner.ScanContract;
import com.journeyapps.barcodescanner.ScanOptions;


public class MainActivity extends AppCompatActivity {
    Button qrScan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        qrScan = findViewById(R.id.qr_scan);

        qrScan.setOnClickListener(v ->{
            scanCode();
        });
    }

    private void scanCode(){
        ScanOptions options = new ScanOptions();
        options.setPrompt("Pridajte hlasitost na svetlo");
        options.setBeepEnabled(true);
        options.setOrientationLocked(true);
        options.setCaptureActivity(CaptureAct.class);
        randomLauncher.launch(options);
    }
    ActivityResultLauncher<ScanOptions> randomLauncher = registerForActivityResult(new ScanContract(), result ->{
        if(result.getContents() != null){
            AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
            builder.setTitle("POZOR");
            if(result.getContents().contains("http://") || result.getContents().contains("https://")){
                String sprava = "budete presmerovany na tuto adresu ! \n";
                builder.setMessage(sprava + result.getContents());
            }
            else if(result.getContents().contains("tel:")){
                String volat = "\n chcete vytocit toto cislo ?";
                builder.setMessage(result.getContents() + volat);
            }
            else if(result.getContents().contains("SMSTO:")){
                String sms = "chcete zaslat sms na toto cislo ?\n";
                builder.setMessage(sms + result.getContents());
            }
            else if(result.getContents().contains("MATMSG:")){
                String mail = "chcete zaslat mail ?\n";
                builder.setMessage(mail + result.getContents());
            }
            else if(result.getContents().contains("BEGIN") && result.getContents().contains("END")){
                String vcard = "chcete nahrat tento kontakt ?\n";
                builder.setMessage(vcard + result.getContents());
            }
            else{builder.setMessage(result.getContents());}
            builder.setPositiveButton("YES", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    if(result.getContents().contains("http://") || result.getContents().contains("https://")){
                        String url = result.getContents();
                        builder.setMessage("chcete sa presmerovat na tuto adresu ? "+ url);
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(browserIntent);
                    }
                    else if(result.getContents().contains("tel:") && result.getContents().length() <=14){
                        Uri call = Uri.parse(result.getContents());
                        Intent surf = new Intent(Intent.ACTION_DIAL, call);
                        startActivity(surf);
                    }
                    else if (result.getContents().contains("SMSTO:")){
                        String[] string = result.getContents().split(":");
//                        [SMSTO, 0910108851, ahoj to som ja]
                        Uri uri = Uri.parse("smsto:" + string[1]);
                        Intent it = new Intent(Intent.ACTION_SENDTO, uri);
                        it.putExtra("sms_body", string[2]);
                        startActivity(it);
                    }
                    else if(result.getContents().contains("MATMSG:")){
                        String message = result.getContents().replace(";",":");
//                        MATMSG:TO:polaskom29@gmail.com:SUB:SPRAVA:AHOJ TU SOM JA::
                        String[] content = message.split(":");
//                        System.out.println(content);
                        Intent intent = new Intent(Intent.ACTION_SENDTO);
                        intent.setData(Uri.parse("mailto:")); // only email apps should handle this
//                        intent.putExtra(Intent.EXTRA_SUBJECT,"subject"+content[4]);
//                        intent.putExtra(Intent.EXTRA_TEXT, "body"+content[5]);
                        intent.putExtra("to",content[2]);
                        intent.putExtra("subject", content[4]);
                        intent.putExtra("body", content[6]);

                        startActivity(intent);
                }
                    else if(result.getContents().contains("BEGIN") && result.getContents().contains("END")){
                        String data = result.getContents().replace(";",":");
                        String data1 =   data.replaceAll("ORG", "");
                        String data2 = data1.replaceAll("URL","");
                        String[] split = data2.split(":");
//                        [BEGIN,VCARDVERSION,3.0,N,polasko,martinORG,companyEmail,type=internet,random@random.sk,URL,WWW.RANDON.SK,tel,type=cell,tel,01234566789,tel,type=fax,adr,,,,Street,Kosice,kosice,04001,slovakia]
                        Intent intent = new Intent(Intent.ACTION_INSERT);
                        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
                        intent.putExtra(ContactsContract.Intents.Insert.EMAIL, split[7]);
                        intent.putExtra(ContactsContract.Intents.Insert.NAME, split[3]+ " " + split[4]);
                        intent.putExtra(ContactsContract.Intents.Insert.PHONE, split[11]);
                        startActivity(intent);
                    }
            }
            });
            builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
               @Override
               public void onClick(DialogInterface dialogInterface, int i) {
                    dialogInterface.dismiss();
               }
           }).show();
        }
    });

}



