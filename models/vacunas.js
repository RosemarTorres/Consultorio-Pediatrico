const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase.js');

const Vacunas = sequelize.define('vacunas', {
    
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    
    tuberculosis1: {
      type: DataTypes.INTEGER,
      
    }, 
    
    tuberculosis2: {
      type: DataTypes.INTEGER,
      
    }, 
    
    tuberculosis3: {
      type: DataTypes.INTEGER,
      
    }, 
    
    tuberculosis4: {
      type: DataTypes.INTEGER,
      
    }, 
    
    tuberculosis5: {
      type: DataTypes.INTEGER,
      
    }, 
    
    polio1: {
      type: DataTypes.INTEGER,
      
    }, 
    
    polio2: {
      type: DataTypes.INTEGER,
      
    }, 
    
    polio3: {
      type: DataTypes.INTEGER,
      
    },

    polio4: {
      type: DataTypes.INTEGER,
      
    },
    
    polio5: {
      type: DataTypes.INTEGER,
      
    },
    
    triple1: {
      type: DataTypes.INTEGER,
      
    },
    
    triple2: {
      type: DataTypes.INTEGER,
      
    },
    
    triple3: {
      type: DataTypes.INTEGER,
      
    },
    
    triple4: {
      type: DataTypes.INTEGER,
      
    },
    
    triple5: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisB1: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisB2: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisB3: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisB4: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisB5: {
      type: DataTypes.INTEGER,
      
    },
    
    rotavirus1: {
      type: DataTypes.INTEGER,
      
    },
    
    rotavirus2: {
      type: DataTypes.INTEGER,
      
    },
    
    rotavirus3: {
      type: DataTypes.INTEGER,
      
    },
    
    rotavirus4: {
      type: DataTypes.INTEGER,
      
    },
    
    rotavirus5: {
      type: DataTypes.INTEGER,
      
    },
    
    neumococo1: {
      type: DataTypes.INTEGER,
      
    },
    
    neumococo2: {
      type: DataTypes.INTEGER,
      
    },
    
    neumococo3: {
      type: DataTypes.INTEGER,
      
    },
    
    neumococo4: {
      type: DataTypes.INTEGER,
      
    },
    
    neumococo5: {
      type: DataTypes.INTEGER,
      
    },
    
    trivalente1: {
      type: DataTypes.INTEGER,
      
    },
    
    trivalente2: {
      type: DataTypes.INTEGER,
      
    },
    
    trivalente3: {
      type: DataTypes.INTEGER,
      
    },
    
    trivalente4: {
      type: DataTypes.INTEGER,
      
    },
    
    trivalente5: {
      type: DataTypes.INTEGER,
      
    },
    
    fiebreAmarilla1: {
      type: DataTypes.INTEGER,
      
    },
    
    fiebreAmarilla2: {
      type: DataTypes.INTEGER,
      
    },
    
    fiebreAmarilla3: {
      type: DataTypes.INTEGER,
      
    },
    
    fiebreAmarilla4: {
      type: DataTypes.INTEGER,
      
    },
    
    fiebreAmarilla5: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisA1: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisA2: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisA3: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisA4: {
      type: DataTypes.INTEGER,
      
    },
    
    hepatitisA5: {
      type: DataTypes.INTEGER,
      
    },
    
    antiInfluenza1: {
      type: DataTypes.INTEGER,
      
    },
    
    antiInfluenza2: {
      type: DataTypes.INTEGER,
      
    },
    
    
    antiInfluenza3: {
      type: DataTypes.INTEGER,
      
    },
    
    antiInfluenza4: {
      type: DataTypes.INTEGER,
      
    },
    
    antiInfluenza5: {
      type: DataTypes.INTEGER,
      
    },
    
    varicela1: {
      type: DataTypes.INTEGER,
      
    },
    
    varicela2: {
      type: DataTypes.INTEGER,
      
    },
    
    varicela3: {
      type: DataTypes.INTEGER,
      
    },
    
    varicela4: {
      type: DataTypes.INTEGER,
      
    },
    
    varicela5: {
      type: DataTypes.INTEGER,
      
    },
    
    toxoideTetánico1: {
      type: DataTypes.INTEGER,
      
    },
    
    toxoideTetánico2: {
      type: DataTypes.INTEGER,
      
    },
    
    toxoideTetánico3: {
      type: DataTypes.INTEGER,
      
    },
    
    toxoideTetánico4: {
      type: DataTypes.INTEGER,
      
    },
    
    toxoideTetánico5: {
      type: DataTypes.INTEGER,
      
    },
    
    pentavalente1: {
      type: DataTypes.INTEGER,
      
    },
    
    pentavalente2: {
      type: DataTypes.INTEGER,
      
    },
    
    pentavalente3: {
      type: DataTypes.INTEGER,
      
    },
    
    pentavalente4: {
      type: DataTypes.INTEGER,
      
    },
    
    pentavalente5: {
      type: DataTypes.INTEGER,
      
    },
    
    hexavalente1: {
      type: DataTypes.INTEGER,
      
    },
    
    hexavalente2: {
      type: DataTypes.INTEGER,
      
    },
    
    hexavalente3: {
      type: DataTypes.INTEGER,
      
    },
    
    hexavalente4: {
      type: DataTypes.INTEGER,
      
    },
    
    hexavalente5: {
      type: DataTypes.INTEGER,
      
    },
    
    otros1: {
      type: DataTypes.INTEGER,
      
    },
    
    otros2: {
      type: DataTypes.INTEGER,
      
    },
    
    otros3: {
      type: DataTypes.INTEGER,
      
    },
    
    otros4: {
      type: DataTypes.INTEGER,
      
    },
    
    otros5: {
      type: DataTypes.INTEGER,
      
    },
    
    idPacientes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model : 'pacientes',//Asegúrate de que el nombre de la tabla sea correcto
        key: 'id'
      }
    },
    
  }, {
    timestamps: true // Para incluir columnas de `createdAt` y `updatedAt`
  });
  
  module.exports = Vacunas;