pragma solidity ^0.4.0;

//

// importer LE FICHIER DE CODE DE l'interface ERC20
import "ERC20.sol";
// DEBUT DU CONTRAT 
contract Xcoin is ERC20{
    string public constant symbol = "Xco";
    string public constant name = "Xcoin";
    
    //FRACTIONS POSSIBLES OU NOMBRE DE CHIFFRES DERRIERE LE VIRGULE 
    uint8 public constant decimals = 18;
    
    //NOMBRE DE Xcoin initiale
    uint private constant __totalSupply = 100000;
    
    //MAPPING EST UNE table de hachage OU ON VA STOCKER LES soldes presents sur chaque compte
    mapping (address => uint) private __balanceOf;
    address owner;
    
    //__allowances inclura tous les comptes approuvés pour un retrait d'un compte donné ainsi 
    //que la somme de retrait autorisée pour chacun
    mapping (address => mapping (address => uint)) private __allowances;
    
    
    //construire un compte et initialiser son solde
    constructor() public {
        //__totalSupply = total;
        owner = msg.sender;
        __balanceOf[msg.sender] = __totalSupply;
}

// constant:read only
    function totalSupply() public constant returns (uint _totalSupply) {
        _totalSupply = __totalSupply;
    }
    
    //return solde du compte
    function balanceOf(address _addr) public constant returns (uint balance) {
        return __balanceOf[_addr];
    }
    
    
/// @notice send `_value` token to `_to` from `msg.sender`
/// @param _to The address of the recipient
/// @param _value The amount of token to be transferred
/// @return Whether the transfer was successful or not
    function transfer(address _to, uint _value) public returns (bool success) {
        if (_value > 0 && _value <= balanceOf(msg.sender)) {
            __balanceOf[msg.sender] -= _value;
            __balanceOf[_to] += _value;
            return true;
        }
        //msg est une variable globale déclarée et remplie par Ethereum lui-même. 
        //Il contient des données importantes pour l'exécution du contrat.
        //Le champ que nous utilisons ici: msg.sender contient le compte Ethereum exécutant la fonction de contrat actuelle
        return false;
    }
    
    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        if (__allowances[_from][msg.sender] > 0 &&
            _value > 0 &&
            __allowances[_from][msg.sender] >= _value && 
            __balanceOf[_from] >= _value) {
            __balanceOf[_from] -= _value;
            __balanceOf[_to] += _value;
            
            __allowances[_from][msg.sender] -= _value;
            return true;
        }
        return false;
    }
    
    function approve(address _spender, uint _value) public returns (bool success) {
        __allowances[owner][_spender] = _value;
        return true;
    }
    
    function allowance(address _owner, address _spender) public constant returns (uint remaining) {
        return __allowances[_owner][_spender];
    }

    function getOwnerAddress() public constant returns (address){
        return owner;
    }
}